import {
  CHAIN_NAME,
  FEE_BASKET,
  FEE_DESK,
  FEE_PLATFORM,
  FEE_URL,
  QUOTE,
  SUPPLY,
  TAX,
  TICKER,
  formatNum,
} from "@/data/game";
import { BrandMark, BasketList, CaBox, ModeNav } from "@/components/chrome";

export function RulesScreen() {
  return (
    <main className="page">
      <img className="page-bg" src="/riders/office.jpg" alt="" />
      <div className="page-shade" />
      <div className="page-wrap rules">
        <header className="page-top">
          <BrandMark compact />
          <ModeNav current="rules" />
        </header>

        <section className="metal hero">
          <p className="kicker">How the launch is supposed to run</p>
          <h1>Helper first. Then the ticker.</h1>
          <p>
            MrStock is a skate-shop character select in front of a LetsCash meme. The coin launches
            on {CHAIN_NAME}. Tax {TAX}%, once. {FEE_PLATFORM}% stays with LetsCash. {FEE_DESK}% is
            the desk. {FEE_BASKET}% buys NVDA, SPY and MU for holders. The helper is on chain. The
            coin address is on the plaque. The stream is not bound until bind. The list inside the
            helper cannot grow.
          </p>
        </section>

        <CaBox />

        <article className="slate rule">
          <h2>1 · The launch</h2>
          <p>
            LetsCash, one transaction, liquidity locked by them. Name <b>MrStock</b>. Ticker{" "}
            <b>${TICKER}</b>. Supply <b>{formatNum(SUPPLY)}</b>. Tax <b>{TAX}%</b>. The pool is
            priced in {QUOTE}. The only fee wallet is the helper, already on chain. It forwards
            7/27 of each claim to the desk and keeps 20/27 for NVDA, SPY and MU. Do not also list
            the desk as a fee wallet. The coin address is posted. This site cannot sign bind.
          </p>
          <p>
            <a href={FEE_URL} target="_blank" rel="noreferrer">
              LetsCash fee rules
            </a>
          </p>
        </article>

        <article className="slate rule">
          <h2>2 · Where the {TAX}% goes</h2>
          <p>
            LetsCash keeps {FEE_PLATFORM}% of the trade at every tax rate. That is not a dial we
            turn. Everything above it is the launch share, and at {TAX}% that share is{" "}
            {FEE_DESK + FEE_BASKET}%. We split it once: {FEE_DESK}% to the desk wallet, {FEE_BASKET}%
            to the helper. The rate cannot be raised or cut after launch. The creator can hand the
            fee stream to a new address later. That handoff is the only way a fourth stock happens,
            and it is a new contract, not a silent edit.
          </p>
          <p>
            The helper buys NVDA, SPY and MU. It must not have a function that adds, swaps or
            removes a name, and it must not have a withdraw for the basket. The desk wallet holds
            the {FEE_DESK}% only. If the pot does not clear the cost of the buy, it waits. No
            volume, no stock.
          </p>
          <BasketList />
        </article>

        <article className="slate rule">
          <h2>3 · The floor</h2>
          <p>
            Ten lines on the desk — SPYLINE, NASPOP, DOWOLLIE, VIXKICK, BULLRUN, BEARPUT, SHRED,
            WOLFR, TONY, BLOCK — are the riders’ parody tape. Practice prices. Not the three the
            helper buys, not a copy of any live index, not seats you are owed.
          </p>
        </article>

        <article className="slate rule">
          <h2>4 · What this is not</h2>
          <ul className="rule-list">
            <li>Not Tony Hawk, not those investors, not those banks. Parody names, original riders.</li>
            <li>Not a fund, not an ETF, not a share. One meme. Three stock tokens, if the helper runs.</li>
            <li>Not another index. Their chart, their ten, their high. This basket is three, and it is not live.</li>
            <li>Not a wallet with the {FEE_BASKET}%. The helper comes first. This site cannot deploy it.</li>
            <li>Not advice. A round trip is {TAX * 2}% before the price moves. You can lose the entire position.</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
