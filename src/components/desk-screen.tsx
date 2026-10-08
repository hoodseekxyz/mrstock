import { useMemo, useState } from "react";
import {
  BASKET_SEATS,
  CHAIN_ID,
  FEE_BASKET,
  FEE_DESK,
  FEE_PLATFORM,
  FEE_URL,
  SEATS,
  SUPPLY,
  TAX,
  TICKER,
  formatNum,
  formatUsd,
  practicePrice,
} from "@/data/game";
import { BrandMark, BasketList, CaBox, ModeNav } from "@/components/chrome";

const PRACTICE_NOW = Date.UTC(2026, 0, 2, 14, 30, 0);

export function DeskScreen() {
  const [hold, setHold] = useState(1_000_000);
  const [trade, setTrade] = useState(10_000);

  const platform = trade * (FEE_PLATFORM / 100);
  const desk = trade * (FEE_DESK / 100);
  const basket = trade * (FEE_BASKET / 100);
  const round = trade * ((TAX * 2) / 100);
  const slice = (hold / SUPPLY) * basket;

  const quotes = useMemo(
    () =>
      SEATS.map((seat, i) => {
        const px = practicePrice(seat.base, i + 1, PRACTICE_NOW);
        const prev = practicePrice(seat.base, i + 1, PRACTICE_NOW - 60_000);
        const change = ((px - prev) / prev) * 100;
        return { ...seat, px, change };
      }),
    [],
  );

  return (
    <main className="page">
      <img className="page-bg" src="/riders/office.jpg" alt="" />
      <div className="page-shade" />
      <div className="page-wrap">
        <header className="page-top">
          <BrandMark compact />
          <ModeNav current="desk" />
        </header>

        <section className="metal hero">
          <p className="kicker">MrStock · LetsCash · {TAX}%</p>
          <h1>Three seats. Not ten.</h1>
          <p>
            ${TICKER} launches on LetsCash, on Robinhood Chain. The tax is {TAX}% on the buy and{" "}
            {TAX}% on the sell, set once, and it cannot move. {FEE_PLATFORM}% is LetsCash.{" "}
            {FEE_DESK}% is the desk. {FEE_BASKET}% is named to a helper that buys {BASKET_SEATS}{" "}
            stock tokens, NVDA, SPY and MU, and pushes them to holders. That helper is not deployed.
            The three names do not get edited later. The coin does not open until the helper is the
            fee recipient. Someone else’s all-time high is not this chart.
          </p>
        </section>

        <section className="split-row three">
          <article className="slate split">
            <strong>{FEE_PLATFORM.toFixed(1)}%</strong>
            <h2>LetsCash</h2>
            <p>Platform cut, on every trade, not ours. Their burn, their lights.</p>
          </article>
          <article className="slate split">
            <strong>{FEE_DESK.toFixed(1)}%</strong>
            <h2>The desk</h2>
            <p>Build, gas, the crank. A named wallet. Not a dividend.</p>
          </article>
          <article className="slate split hot">
            <strong>{FEE_BASKET.toFixed(1)}%</strong>
            <h2>{BASKET_SEATS} stocks</h2>
            <p>The helper buys NVDA, SPY and MU and sends them out. The list does not grow.</p>
          </article>
        </section>

        <section className="slate board">
          <header className="board-head">
            <div>
              <h2>The basket</h2>
              <p>Robinhood stock tokens. Not the shares, not the ETF in a brokerage. Click a row to copy.</p>
            </div>
            <span className="pill">Locked three</span>
          </header>
          <BasketList />
        </section>

        <section className="slate board">
          <header className="board-head">
            <div>
              <h2>The floor</h2>
              <p>Ten parody lines. Not the basket. The basket is three stock tokens, and it is not live.</p>
            </div>
            <span className="pill">Practice tape</span>
          </header>
          <div className="seat-table" role="table">
            <div className="seat head" role="row">
              <span>Seat</span>
              <span>Practice</span>
              <span>1m</span>
              <span>Weight</span>
              <span>Covers</span>
            </div>
            {quotes.map((seat) => (
              <div className="seat" role="row" key={seat.ticker}>
                <span className="seat-id">
                  <img src={seat.face} alt="" />
                  <span>
                    <b>${seat.ticker}</b>
                    <small>{seat.name}</small>
                  </span>
                </span>
                <span className="mono">{seat.px.toFixed(2)}</span>
                <span className={seat.change >= 0 ? "up mono" : "down mono"}>
                  {seat.change >= 0 ? "+" : ""}
                  {seat.change.toFixed(2)}%
                </span>
                <span className="mono">—</span>
                <span className="cover">
                  <b>{seat.rider}</b>
                  <small>{seat.blurb}</small>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="metal calc">
          <header>
            <h2>What one trade owes the {TAX}%</h2>
            <p>
              Practice numbers. A round trip is {TAX * 2}% before the price moves. Your slice is
              your share of that one basket buy, not a day, and not a payment. The helper is not
              deployed, so nothing here has been bought.
            </p>
          </header>
          <div className="calc-grid">
            <label>
              Trade size
              <input
                type="range"
                min={100}
                max={100000}
                step={100}
                value={trade}
                onChange={(e) => setTrade(Number(e.target.value))}
              />
              <strong>{formatUsd(trade)}</strong>
            </label>
            <label>
              You hold
              <input
                type="range"
                min={50000}
                max={50000000}
                step={50000}
                value={hold}
                onChange={(e) => setHold(Number(e.target.value))}
              />
              <strong>
                {formatNum(hold)} {TICKER}
              </strong>
            </label>
          </div>
          <dl className="calc-out">
            <div>
              <dt>LetsCash {FEE_PLATFORM}%</dt>
              <dd>{formatUsd(platform)}</dd>
            </div>
            <div>
              <dt>Desk {FEE_DESK}%</dt>
              <dd>{formatUsd(desk)}</dd>
            </div>
            <div>
              <dt>Basket {FEE_BASKET}%</dt>
              <dd>{formatUsd(basket)}</dd>
            </div>
            <div>
              <dt>Your slice of that buy</dt>
              <dd>{formatUsd(slice)}</dd>
            </div>
            <div>
              <dt>Round trip</dt>
              <dd>{formatUsd(round)}</dd>
            </div>
            <div>
              <dt>Chain</dt>
              <dd>Robinhood · {CHAIN_ID}</dd>
            </div>
          </dl>
        </section>

        <CaBox />

        <section className="slate pair-strip">
          <div>
            <p className="kicker">Helper · not deployed</p>
            <p>
              The {FEE_BASKET}% has to land on a contract that buys NVDA, SPY and MU and cannot add a
              fourth name. A new helper can be written later. LetsCash can hand the fee stream to
              it. This contract cannot. No helper, no coin.
            </p>
          </div>
          <div className="pair-links">
            <a href={FEE_URL} target="_blank" rel="noreferrer">
              LetsCash fee rules
            </a>
          </div>
        </section>

        <p className="footer-note">
          Parody desk. These riders are not those people and not those firms. ${TICKER} is a meme,
          not equity, not an ETF, not a managed fund, and not another project’s index. The pool can
          go to zero. A round trip pays {TAX * 2}% before the price moves. Nothing here is advice.
          This site does not deploy the coin or the helper.
        </p>
      </div>
    </main>
  );
}
