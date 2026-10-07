import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ANCHOR,
  LAUNCH_URL,
  PAIR,
  PAIR_URL,
  TICKER,
  TRADERS,
  oppositeStance,
  type Trader,
} from "@/data/game";
import { BrandMark, CaBox, GlobeMark, Meter, MiniChart, ModeNav, Spark } from "@/components/chrome";

const TAPE = [
  { name: "S&P 500", value: "4,567.23", change: "+1.26%" },
  { name: "NASDAQ", value: "14,236.19", change: "+1.48%" },
  { name: "DOW", value: "35,678.41", change: "+1.12%" },
];

export function SelectScreen() {
  const [index, setIndex] = useState(0);
  const [spins, setSpins] = useState(0);
  const [bioOn, setBioOn] = useState(true);
  const [cardOn, setCardOn] = useState(false);
  const trader = TRADERS[index] ?? TRADERS[0];
  const stance = spins % 2 === 0 ? trader.stance : oppositeStance(trader.stance);
  const yaw = [0, 12, 0, -12][spins % 4] ?? 0;

  function go(delta: number) {
    setIndex((i) => (i + delta + TRADERS.length) % TRADERS.length);
    setSpins(0);
  }

  function back() {
    if (cardOn) {
      setCardOn(false);
      return;
    }
    if (!bioOn) {
      setBioOn(true);
      return;
    }
    go(-1);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") go(1);
      else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") go(-1);
      else if (e.key === "r" || e.key === "R") setSpins((n) => n + 1);
      else if (e.key === "b" || e.key === "B" || e.key === "ArrowUp") setBioOn((v) => !v);
      else if (e.key === "Enter") setCardOn(true);
      else if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        back();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className="stage">
      <img
        key={trader.id}
        className="stage-photo"
        src={trader.photo}
        alt=""
        style={{ "--flip": spins % 2 ? "-1" : "1", "--yaw": `${yaw}deg` } as CSSProperties}
      />
      <div className="stage-shade" />
      <div className="hud">
        <header className="hud-top">
          <div className="top-stack">
            <div className="metal select-plaque">
              <GlobeMark />
              <h1>Select trader</h1>
              <span className="plaque-chev" aria-hidden="true">
                ›
              </span>
            </div>
            <div className="metal tape">
              {TAPE.map((row) => (
                <div key={row.name} className="tape-cell">
                  <span className="tape-name">{row.name}</span>
                  <span className="tape-value">{row.value}</span>
                  <span className="tape-up">{row.change}</span>
                </div>
              ))}
              <Spark values={trader.chart} />
            </div>
            <CaBox />
          </div>
          <div className="top-brand">
            <BrandMark />
            <ModeNav current="ride" />
          </div>
        </header>

        <div className="hud-body">
          <button className="chev left" type="button" onClick={() => go(-1)} aria-label="Previous trader">
            ‹
          </button>
          <article className="metal stat-card" aria-live="polite">
            <span className="ear" aria-hidden="true" />
            <header className="stat-head">
              <div>
                <h2>{trader.name}</h2>
                <p>Pro trader</p>
              </div>
              <span className="code">{trader.code}</span>
            </header>
            <ul className="stat-list">
              {trader.stats.map((stat) => (
                <li key={stat.label}>
                  <span>{stat.label}</span>
                  <Meter value={stat.value} />
                </li>
              ))}
            </ul>
            <footer className="stat-foot">
              <span>
                {trader.stance} / {oppositeStance(trader.stance)}
              </span>
              <b>{stance}</b>
            </footer>
          </article>
          <button className="chev right" type="button" onClick={() => go(1)} aria-label="Next trader">
            ›
          </button>

          <section className={bioOn ? "slate bio" : "slate bio shut"} aria-hidden={!bioOn}>
            <h3>Bio</h3>
            <p>{trader.bio}</p>
            <div className="bio-mark" aria-hidden="true">
              <GlobeMark />
              <span>{trader.signature}</span>
            </div>
          </section>

          <aside className="slate chart-card">
            <MiniChart values={trader.chart} />
            <div className="chart-axis" aria-hidden="true">
              <span>5400</span>
              <span>5200</span>
              <span>5000</span>
              <span>4800</span>
              <span>4500</span>
            </div>
            <div className="chart-months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </aside>
        </div>

        <p className="voice">{trader.line}</p>

        <img className="bull" src="/riders/bull.png" alt="" />

        <footer className="controls">
          <button type="button" className="ctl" onClick={() => go(1)}>
            <span className="btn-face pad" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>Select</span>
          </button>
          <button type="button" className="ctl" onClick={() => setBioOn((v) => !v)} aria-pressed={bioOn}>
            <span className="btn-face tri" aria-hidden="true" />
            <span>Bio</span>
          </button>
          <button type="button" className="ctl" onClick={() => setSpins((n) => n + 1)}>
            <span className="btn-face shoulders" aria-hidden="true">
              <b>‹</b>
              <b>›</b>
            </span>
            <span>Rotate</span>
          </button>
          <button type="button" className="ctl" onClick={() => setCardOn(true)}>
            <span className="btn-face cross" aria-hidden="true">
              ×
            </span>
            <span>Accept</span>
          </button>
          <button type="button" className="ctl" onClick={back}>
            <span className="btn-face circle" aria-hidden="true" />
            <span>Back</span>
          </button>
        </footer>
      </div>

      {cardOn ? <AcceptCard trader={trader} onClose={() => setCardOn(false)} /> : null}
    </main>
  );
}

function AcceptCard({ trader, onClose }: { trader: Trader; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PAIR);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="accept-title">
      <button className="modal-dim" type="button" aria-label="Close" onClick={onClose} />
      <div className="metal accept">
        <p className="kicker">Riding with {trader.name}</p>
        <h2 id="accept-title">$MRSTOCK</h2>
        <p className="accept-lead">
          This address is the SPY stock token. It is not $MRSTOCK. Deploy on Long against SPY and
          the coin address prints on that transaction. This page cannot sign it.
        </p>
        <dl className="pair-block">
          <div>
            <dt>SPY · the quote · not the coin</dt>
            <dd>{PAIR}</dd>
          </div>
        </dl>
        <div className="accept-actions">
          <button type="button" className="solid" onClick={copy}>
            {copied ? "SPY copied" : "Copy SPY"}
          </button>
          <a className="solid ghost" href={PAIR_URL} target="_blank" rel="noreferrer">
            View SPY
          </a>
          <a className="solid ghost" href={LAUNCH_URL} target="_blank" rel="noreferrer">
            Deploy on Long
          </a>
          <Link className="solid" to="/desk">
            Open the desk
          </Link>
        </div>
        <p className="fine">
          Name MrStock, ticker ${TICKER}, anchor {ANCHOR}. Parody riders. Not those people. Not
          those firms. Not a fund. Not advice.
        </p>
        <CaBox tone="inset" />
        <button type="button" className="text-back" onClick={onClose}>
          Back to the floor
        </button>
      </div>
    </div>
  );
}
