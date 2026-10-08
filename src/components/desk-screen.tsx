import { useMemo, useState } from "react";
import {
  ANCHOR,
  CHAIN_ID,
  LAUNCH_URL,
  PAIR,
  PAIR_URL,
  SEATS,
  SUPPLY,
  TICKER,
  formatNum,
  formatUsd,
  practicePrice,
} from "@/data/game";
import { BrandMark, CaBox, ModeNav } from "@/components/chrome";

export function DeskScreen() {
  const [now] = useState(() => Date.now());
  const [hold, setHold] = useState(1_000_000);
  const [spy, setSpy] = useState(580);
  const [ratio, setRatio] = useState(0.000002);

  const mark = hold * ratio * spy;
  const markTape = hold * ratio * spy * 1.1;
  const markTrade = hold * ratio * 2 * spy;

  const quotes = useMemo(
    () =>
      SEATS.map((seat, i) => {
        const px = practicePrice(seat.base, i + 1, now);
        const prev = practicePrice(seat.base, i + 1, now - 60_000);
        const change = ((px - prev) / prev) * 100;
        return { ...seat, px, change };
      }),
    [now],
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
          <p className="kicker">MrStock · Anchored to {ANCHOR}</p>
          <h1>The coin trades the tape.</h1>
          <p>
            ${TICKER} launches on Long, paired to the SPY stock token, not to ETH. A buy sells SPY
            into the pool. If SPY’s dollar price rises and the pool ratio does not, the coin’s
            dollar mark inside that pair rises with it. The plaque says launch very soon.
          </p>
        </section>

        <section className="split-row three">
          <article className="slate split hot">
            <strong>SPY</strong>
            <h2>The quote</h2>
            <p>Robinhood stock token. The address on the card. Not ${TICKER}.</p>
          </article>
          <article className="slate split">
            <strong>Lock</strong>
            <h2>Buys stock in</h2>
            <p>Buying the meme deposits SPY into the pool. Selling pulls it back out.</p>
          </article>
          <article className="slate split">
            <strong>+SPY</strong>
            <h2>Follows the tape</h2>
            <p>Same coins of SPY, higher stock price, higher dollar mark. Ratio still moves on trades.</p>
          </article>
        </section>

        <section className="slate board">
          <header className="board-head">
            <div>
              <h2>The floor</h2>
              <p>Ten parody lines. Rider coverage. Not a payout, and not a live quote.</p>
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
            <h2>What a SPY move does to a holding you type</h2>
            <p>
              Practice numbers. Two knobs: the stock’s dollar price, and how much SPY one coin is
              worth inside the pair. Not a forecast. Not the live pool.
            </p>
          </header>
          <div className="calc-grid">
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
              <strong>{formatNum(hold)} {TICKER}</strong>
            </label>
            <label>
              Practice SPY price
              <input
                type="range"
                min={400}
                max={800}
                step={1}
                value={spy}
                onChange={(e) => setSpy(Number(e.target.value))}
              />
              <strong>{formatUsd(spy)}</strong>
            </label>
            <label>
              SPY inside one coin
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={Math.round(ratio * 1_000_000)}
                onChange={(e) => setRatio(Number(e.target.value) / 1_000_000)}
              />
              <strong>{ratio.toFixed(6)} SPY</strong>
            </label>
          </div>
          <dl className="calc-out">
            <div>
              <dt>Dollar mark now</dt>
              <dd>{formatUsd(mark)}</dd>
            </div>
            <div>
              <dt>If SPY is +10%</dt>
              <dd>{formatUsd(markTape)}</dd>
            </div>
            <div>
              <dt>If the ratio doubles</dt>
              <dd>{formatUsd(markTrade)}</dd>
            </div>
            <div>
              <dt>Supply at launch</dt>
              <dd>{formatNum(SUPPLY)}</dd>
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
            <p className="kicker">SPY stock token · not the coin</p>
            <p className="mono pair-addr">{PAIR}</p>
          </div>
          <div className="pair-links">
            <a href={PAIR_URL} target="_blank" rel="noreferrer">
              Blockscout
            </a>
            <a href={LAUNCH_URL} target="_blank" rel="noreferrer">
              Deploy on Long
            </a>
          </div>
        </section>

        <p className="footer-note">
          Parody desk. These riders are not those people and not those firms. ${TICKER} is a meme
          coin paired to a stock token, not equity, not an ETF, not a managed fund. The pool can go
          to zero. Nothing here is advice. This site does not deploy the coin.
        </p>
      </div>
    </main>
  );
}
