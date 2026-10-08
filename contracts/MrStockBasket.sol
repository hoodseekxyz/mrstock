// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/// @title MrStockBasket
/// @notice LetsCash creator-fee recipient for $MRSTOCK.
///         Claims ETH, forwards 7/27 to the desk (0.7% of volume when the tax is 3%),
///         and swaps the other 20/27 into NVDA, SPY and MU. Holders claim those tokens.
///         The three names are immutable. There is no withdraw.
interface IERC20 {
    function balanceOf(address) external view returns (uint256);
    function totalSupply() external view returns (uint256);
    function decimals() external view returns (uint8);
    function approve(address, uint256) external returns (bool);
    function transfer(address, uint256) external returns (bool);
}

interface IWETH is IERC20 {
    function deposit() external payable;
}

interface ISwapRouter {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    function exactInputSingle(ExactInputSingleParams calldata params) external payable returns (uint256);
}

interface IPermit2 {
    function approve(address token, address spender, uint160 amount, uint48 expiration) external;
}

interface ILetscashHook {
    function claim(bytes32 poolId) external returns (uint256);
    function poolConfigs(bytes32 poolId)
        external
        view
        returns (address creator, uint16 creatorFeeBps, uint24 feeRate, bool exists, address quote);
}

contract MrStockBasket {
    address public constant HOOK = 0x75A54357D9C78a2Db19004a5FDc76c50F9242AEC;
    address public constant ROUTER = 0xCaf681a66D020601342297493863E78C959E5cb2;
    address public constant PERMIT2 = 0x000000000022D473030F116dDEE9F6B43aC78BA3;
    address public constant WETH = 0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73;
    address public constant DESK = 0xa18d8924482B29c16652345C38620EC83f436c07;
    address public constant NVDA = 0xd0601CE157Db5bdC3162BbaC2a2C8aF5320D9EEC;
    address public constant SPY = 0x117cc2133c37B721F49dE2A7a74833232B3B4C0C;
    address public constant MU = 0xfF080c8ce2E5feadaCa0Da81314Ae59D232d4afD;

    uint24 public constant FEE_NVDA = 500;
    uint24 public constant FEE_SPY = 500;
    uint24 public constant FEE_MU = 10000;

    uint256 public constant DESK_NUM = 7;
    uint256 public constant DESK_DEN = 27;
    uint256 public constant MIN_TOKENS = 100_000;
    uint256 public constant SEAL_GAP = 8 hours;

    bytes32 public poolId;
    address public coin;
    uint256 public minHold;
    uint256 public epoch;
    uint256 public sealedAt;
    uint256 public snapNvda;
    uint256 public snapSpy;
    uint256 public snapMu;
    uint256 public snapSupply;
    uint256 public snapWeight;

    mapping(uint256 => mapping(address => bool)) public claimed;

    uint256 private locked = 1;

    error AlreadyBound();
    error NotBound();
    error NotCreator();
    error NotEthPool();
    error BadKey();
    error NotDesk();
    error Early();
    error NoSupply();
    error AlreadyClaimed();
    error TooSmall();
    error OverWeight();
    error TransferFailed();
    error Busy();

    event Bound(bytes32 poolId, address coin);
    event Harvested(uint256 claimed, uint256 toDesk);
    event Bought(uint256 nvda, uint256 spy, uint256 mu);
    event Sealed(uint256 epoch, uint256 supply);
    event Claimed(uint256 indexed epoch, address indexed holder, uint256 weight);

    modifier lock() {
        if (locked != 1) revert Busy();
        locked = 2;
        _;
        locked = 1;
    }

    receive() external payable {}

    /// @notice Bind the LetsCash ETH pool whose fee recipient is this contract.
    ///         The coin is read off the pool key. It cannot be changed.
    function bind(address currency0, address currency1, uint24 fee, int24 tickSpacing) external lock {
        if (poolId != bytes32(0)) revert AlreadyBound();
        if (currency0 != address(0) && currency1 != address(0)) revert NotEthPool();
        address token = currency0 == address(0) ? currency1 : currency0;
        if (token == address(0) || token == WETH || token == NVDA || token == SPY || token == MU) revert BadKey();

        bytes32 id = keccak256(abi.encode(currency0, currency1, fee, tickSpacing, HOOK));
        (address creator, , , bool exists, address quote) = ILetscashHook(HOOK).poolConfigs(id);
        if (!exists || creator != address(this) || quote != address(0)) revert NotCreator();

        uint8 dec = IERC20(token).decimals();
        if (dec > 18) revert BadKey();

        poolId = id;
        coin = token;
        minHold = MIN_TOKENS * (10 ** dec);
        emit Bound(id, token);
    }

    /// @notice Pull the creator stream and pay the desk 7/27 of what just arrived.
    function harvest() external lock {
        if (poolId == bytes32(0)) revert NotBound();
        uint256 beforeBal = address(this).balance;
        uint256 amount = ILetscashHook(HOOK).claim(poolId);
        uint256 got = address(this).balance - beforeBal;
        uint256 toDesk = got * DESK_NUM / DESK_DEN;
        if (toDesk > 0) {
            (bool ok, ) = DESK.call{value: toDesk}("");
            if (!ok) revert TransferFailed();
        }
        emit Harvested(amount, toDesk);
    }

    /// @notice Swap the ETH still here into the three stocks. Desk passes the minimums.
    ///         Stocks can leave only through claim.
    function buy(uint256 minNvda, uint256 minSpy, uint256 minMu) external lock {
        if (msg.sender != DESK) revert NotDesk();
        if (minNvda == 0 || minSpy == 0 || minMu == 0) revert TooSmall();
        uint256 amount = address(this).balance;
        if (amount == 0) revert TooSmall();
        IWETH(WETH).deposit{value: amount}();
        uint256 wethBal = IERC20(WETH).balanceOf(address(this));
        _allow(wethBal);
        uint256 third = wethBal / 3;
        uint256 nvda = _swap(NVDA, FEE_NVDA, third, minNvda);
        uint256 spy = _swap(SPY, FEE_SPY, third, minSpy);
        uint256 mu = _swap(MU, FEE_MU, IERC20(WETH).balanceOf(address(this)), minMu);
        emit Bought(nvda, spy, mu);
    }

    /// @notice Snapshot whatever stock is already in the contract. At most once per 8 hours.
    function seal() external lock {
        if (coin == address(0)) revert NotBound();
        if (sealedAt != 0 && block.timestamp < sealedAt + SEAL_GAP) revert Early();
        uint256 supply = IERC20(coin).totalSupply();
        if (supply == 0) revert NoSupply();
        sealedAt = block.timestamp;
        epoch += 1;
        snapNvda = IERC20(NVDA).balanceOf(address(this));
        snapSpy = IERC20(SPY).balanceOf(address(this));
        snapMu = IERC20(MU).balanceOf(address(this));
        snapSupply = supply;
        snapWeight = 0;
        emit Sealed(epoch, supply);
    }

    /// @notice Pay this epoch's snapshot, pro-rata to the caller's current balance.
    ///         Weight counted this epoch cannot exceed the supply frozen at seal.
    function claim() external lock {
        if (epoch == 0) revert Early();
        if (claimed[epoch][msg.sender]) revert AlreadyClaimed();
        uint256 bal = IERC20(coin).balanceOf(msg.sender);
        if (bal < minHold) revert TooSmall();
        if (snapWeight + bal > snapSupply) revert OverWeight();
        claimed[epoch][msg.sender] = true;
        snapWeight += bal;
        _send(NVDA, snapNvda * bal / snapSupply);
        _send(SPY, snapSpy * bal / snapSupply);
        _send(MU, snapMu * bal / snapSupply);
        emit Claimed(epoch, msg.sender, bal);
    }

    function _allow(uint256 amount) internal {
        IERC20(WETH).approve(ROUTER, amount);
        if (PERMIT2.code.length > 0) {
            IERC20(WETH).approve(PERMIT2, amount);
            IPermit2(PERMIT2).approve(WETH, ROUTER, uint160(amount), uint48(block.timestamp + 1 hours));
        }
    }

    function _swap(address tokenOut, uint24 fee, uint256 amountIn, uint256 minOut) internal returns (uint256) {
        if (amountIn == 0) return 0;
        return ISwapRouter(ROUTER).exactInputSingle(
            ISwapRouter.ExactInputSingleParams({
                tokenIn: WETH,
                tokenOut: tokenOut,
                fee: fee,
                recipient: address(this),
                amountIn: amountIn,
                amountOutMinimum: minOut,
                sqrtPriceLimitX96: 0
            })
        );
    }

    function _send(address token, uint256 amount) internal {
        if (amount == 0) return;
        (bool ok, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, msg.sender, amount));
        if (!ok || (data.length != 0 && !abi.decode(data, (bool)))) revert TransferFailed();
    }
}
