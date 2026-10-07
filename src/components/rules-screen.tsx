import { ANCHOR, CHAIN_NAME, LAUNCH_URL, PAIR, SUPPLY, TICKER, formatNum } from "@/data/game";
import { BrandMark, ModeNav } from "@/components/chrome";

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
          <h1>One pair. SPY. Then the ticker prints.</h1>
          <p>
            MrStock is a skate-shop character select in front of a stock-paired meme. The coin
            launches on Long, on {CHAIN_NAME}, against the {ANCHOR} stock token. There is no holder
            dividend. The address on the accept card is SPY. ${TICKER} does not exist until someone
            signs the launch.
          </p>
        </section>

        <article className="slate rule">
          <h2>1 · The launch</h2>
          <p>
            Open Long, connect a wallet on Robinhood Chain, and deploy with the anchor set to{" "}
            <b>{ANCHOR}</b>. Name <b>MrStock</b>. Ticker <b>${TICKER}</b>. Planned supply{" "}
            <b>{formatNum(SUPPLY)}</b>. Long mints the coin and opens the stock pair. The coin
            address is whatever that transaction prints. Copy it back here only after it exists.
          </p>
          <p>
            <a href={LAUNCH_URL} target="_blank" rel="noreferrer">
              Open Long
            </a>
          </p>
        </article>

        <article className="slate rule">
          <h2>2 · What the pair actually is</h2>
          <p>
            SPY on this chain is a Robinhood stock token: economic exposure, not a share, not a
            vote, not the ETF in your brokerage. Buying ${TICKER} sells that token into the pool.
            Selling ${TICKER} pulls it back out. Two things move the dollar mark: trades that change
            the ratio, and the dollar price of SPY itself.
          </p>
          <p>
            SPY stock token, for the record, not the coin: <span className="mono">{PAIR}</span>
          </p>
        </article>

        <article className="slate rule">
          <h2>3 · The floor</h2>
          <p>
            Ten lines on the desk — SPYLINE, NASPOP, DOWOLLIE, VIXKICK, BULLRUN, BEARPUT, SHRED,
            WOLFR, TONY, BLOCK — are the riders’ parody tape. Practice prices. Not a basket the
            coin buys, not seats you get paid, not a copy of any live index.
          </p>
        </article>

        <article className="slate rule">
          <h2>4 · What this is not</h2>
          <ul className="rule-list">
            <li>Not Tony Hawk, not those investors, not those banks. Parody names, original riders.</li>
            <li>Not a fund, not an ETF, not SPY itself. One meme, one stock-token pair.</li>
            <li>Not a dividend. Holding does not pay you the ten. The ten are a joke on the wall.</li>
            <li>Not deployed by this website. A browser page cannot sign the launch.</li>
            <li>Not advice. You can lose the entire position.</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
