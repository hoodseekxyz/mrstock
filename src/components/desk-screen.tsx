import { useEffect, useMemo, useState } from "react";
import {
  ELIGIBLE_ASSUMPTION,
  LAUNCH_URL,
  MIN_HOLD,
  PAIR,
  PAIR_URL,
  SEATS,
  SPLIT,
  SUPPLY,
  formatClock,
  formatNum,
  formatUsd,
  practicePrice,
  secondsToEpoch,
} from "@/data/game";
import { BrandMark, ModeNav } from "@/components/chrome";

export function DeskScreen() {
  const [now, setNow] = useState(() => Date.now());
  const [hold, setHold] = useState(1_000_000);
  const [pot, setPot] = useState(4000);
  const [price, setPrice] = useState(0.00008);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remain = secondsToEpoch(new Date(now));
  const eligiblePool = SUPPLY * ELIGIBLE_ASSUMPTION;
  const inSet = hold >= MIN_HOLD;
  const share = inSet ? hold / eligiblePool : 0;
  const payout = share * pot;
  const perSeat = payout / 10;
  const position = hold * price;
  const epochYield = position > 0 ? (payout / position) * 100 : 0;

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
          <p className="kicker">MrStock · Hold 1. Own the desk.</p>
          <h1>Every trade pays the floor.</h1>
          <p>
            $MRSTOCK is the stock-desk cousin of a holder index. A trade pays 5% once, on LetsCash,
            and that split cannot be edited after launch. Four points buy ten equal seats. Those
            seats are pushed to holders when the epoch closes. Eighty cents of every tax dollar is
            holder money.
          </p>
        </section>

        <section className="split-row">
          {SPLIT.map((part) => (
            <article key={part.key} className={part.key === "holders" ? "slate split hot" : "slate split"}>
              <strong>{part.pct.toFixed(2)}%</strong>
              <h2>{part.label}</h2>
              <p>{part.note}</p>
            </article>
          ))}
          <article className="slate split">
            <strong>8h</strong>
            <h2>Epoch</h2>
            <p>00:00, 08:00, 16:00 Europe/Rome. Closes only if the pot covers the crank.</p>
          </article>
        </section>

        <section className="epoch-grid">
          <article className="slate epoch">
            <p className="kicker">Next crank check</p>
            <p className="clock">{formatClock(remain)}</p>
            <p>Pre-launch. The pot is empty until $MRSTOCK prints. No volume, no dividend.</p>
            <dl className="facts">
              <div>
                <dt>Chain</dt>
                <dd>Robinhood · 4663</dd>
              </div>
              <div>
                <dt>Supply at launch</dt>
                <dd>{formatNum(SUPPLY)}</dd>
              </div>
              <div>
                <dt>In the set</dt>
                <dd>{formatNum(MIN_HOLD)} · 0.01%</dd>
              </div>
              <div>
                <dt>Seat weight</dt>
                <dd>10.00% each</dd>
              </div>
            </dl>
          </article>
          <article className="slate epoch">
            <p className="kicker">Worked trade · $1,000</p>
            <ul className="worked">
              <li>
                <span>Tax, 5%</span>
                <b>$50.00</b>
              </li>
              <li>
                <span>Holders, 4%</span>
                <b>$40.00</b>
              </li>
              <li>
                <span>Desk, 0.7%</span>
                <b>$7.00</b>
              </li>
              <li>
                <span>LetsCash, 0.3%</span>
                <b>$3.00</b>
              </li>
            </ul>
            <p className="fine">Round trip is about 10% before the price even moves. That is the cost of the tape.</p>
          </article>
        </section>

        <section className="slate board">
          <header className="board-head">
            <div>
              <h2>The ten</h2>
              <p>Published desk. Equal dollars. Not a liquidity rank, and not a live quote.</p>
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
                <span className="mono">10.00%</span>
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
            <h2>What an example epoch would pay a holding your size</h2>
            <p>Trailing math on numbers you type. Not a forecast. Assumes 70% of supply is eligible.</p>
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
              <strong>{formatNum(hold)} MRSTOCK</strong>
            </label>
            <label>
              Example 4% pot
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={pot}
                onChange={(e) => setPot(Number(e.target.value))}
              />
              <strong>{formatUsd(pot)}</strong>
            </label>
            <label>
              Example coin price
              <input
                type="range"
                min={0.00001}
                max={0.001}
                step={0.00001}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <strong>${price.toFixed(5)}</strong>
            </label>
          </div>
          {!inSet ? (
            <p className="warn">Under 100,000. This wallet would trade, and miss the epoch.</p>
          ) : null}
          <dl className="calc-out">
            <div>
              <dt>Example position</dt>
              <dd>{formatUsd(position)}</dd>
            </div>
            <div>
              <dt>Paid that epoch</dt>
              <dd>{formatUsd(payout)}</dd>
            </div>
            <div>
              <dt>Each seat</dt>
              <dd>{formatUsd(perSeat)}</dd>
            </div>
            <div>
              <dt>Yield, that epoch</dt>
              <dd>{epochYield.toFixed(2)}%</dd>
            </div>
            <div>
              <dt>Share of eligible</dt>
              <dd>{(share * 100).toFixed(3)}%</dd>
            </div>
          </dl>
        </section>

        <section className="slate pair-strip">
          <div>
            <p className="kicker">SPY pair · not the token</p>
            <p className="mono pair-addr">{PAIR}</p>
          </div>
          <div className="pair-links">
            <a href={PAIR_URL} target="_blank" rel="noreferrer">
              Blockscout
            </a>
            <a href={LAUNCH_URL} target="_blank" rel="noreferrer">
              LetsCash launch
            </a>
          </div>
        </section>

        <p className="footer-note">
          Parody desk. These riders are not those people and not those firms. $MRSTOCK is a meme
          coin, not equity, not an ETF, not a managed fund. Seats can go to zero. Nothing here is
          advice.
        </p>
      </div>
    </main>
  );
}
