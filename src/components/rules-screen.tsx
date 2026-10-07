import { LAUNCH_URL, MIN_HOLD, PAIR, SUPPLY, formatNum } from "@/data/game";
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
          <p className="kicker">How the desk is supposed to run</p>
          <h1>Set once. Then the crank does the rest.</h1>
          <p>
            MrStock is the stock-floor version of a holder index. Hood-style math, a published desk
            of ten seats instead of “whatever is deepest this hour,” and a skate-shop character
            select in front. The coin is launched on LetsCash, Robinhood Chain, into a locked pool.
            The token address does not exist until that transaction. The address on the accept card
            is the SPY pair.
          </p>
        </section>

        <article className="slate rule">
          <h2>1 · The launch</h2>
          <p>
            LetsCash mints a fixed supply and seeds a Uniswap pool in one transaction. Liquidity
            stays locked. The tax is chosen once: 1%, 3%, 5%, or 10%. MrStock launches at{" "}
            <b>5%</b>. After that, nobody — not the desk, not the pad — edits the rate.
          </p>
          <p>
            Planned supply: <b>{formatNum(SUPPLY)}</b>. Quote asset and fee asset follow the pad:
            the pool trades against ETH, and the tax pays out in ETH.
          </p>
          <p>
            <a href={LAUNCH_URL} target="_blank" rel="noreferrer">
              Open the LetsCash launch desk
            </a>
          </p>
        </article>

        <article className="slate rule">
          <h2>2 · Where 5% goes</h2>
          <ul className="rule-list">
            <li>
              <b>4.00%</b> — dividend wedge. Buys the ten seats in equal dollars and pushes them to
              eligible holders. No claim button.
            </li>
            <li>
              <b>0.70%</b> — desk. Build, execution gas, the crank that closes the epoch.
            </li>
            <li>
              <b>0.30%</b> — LetsCash platform.
            </li>
          </ul>
          <p>4 of 5 is holder money. A round trip is about ten percent before price.</p>
        </article>

        <article className="slate rule">
          <h2>3 · The epoch</h2>
          <p>
            Checks at 00:00, 08:00 and 16:00 Europe/Rome. The epoch settles only when the accrued
            wedge covers ten buys plus the payouts. A quiet tape can skip a close. Holder balances
            are read at the close. What you held yesterday does not count if you sold before the
            snapshot.
          </p>
          <p>
            Your share of a seat = your balance ÷ eligible supply × the amount of that seat bought
            this epoch. Ten seats, equal split of the wedge, one seat one ticket.
          </p>
        </article>

        <article className="slate rule">
          <h2>4 · Who is in the set</h2>
          <p>
            At least <b>{formatNum(MIN_HOLD)}</b> $MRSTOCK — 0.01% of a 1 billion supply — at the
            snapshot. Pools, the distributor, and burn addresses stay out. Under the line, you
            still trade. You just don’t get that epoch.
          </p>
        </article>

        <article className="slate rule">
          <h2>5 · The ten seats</h2>
          <p>
            Not a copy of a live liquidity ranking. The desk publishes ten stock-flavored lines —
            SPYLINE, NASPOP, DOWOLLIE, VIXKICK, BULLRUN, BEARPUT, SHRED, WOLFR, TONY, BLOCK — at
            10% each. They are meme seats with rider coverage, not shares of any company and not
            the ETF on the wall. The practice tape on the desk page is a clock, not a quote.
          </p>
          <p>
            SPY pair, for the record, not the token: <span className="mono">{PAIR}</span>
          </p>
        </article>

        <article className="slate rule">
          <h2>6 · What this is not</h2>
          <ul className="rule-list">
            <li>Not Tony Hawk, not those investors, not those banks. Parody names, original riders.</li>
            <li>Not a fund, not an index fund, not diversified in any serious sense. One chain, one tape, ten seats that can fall together.</li>
            <li>Not a promise of yield. No volume, no dividend. A big epoch buys through thin pools and moves the price against itself.</li>
            <li>Not live yet. Until the coin prints, the countdown is just the clock the crank will use.</li>
            <li>Not advice. You can lose the entire position, including tokens that show up in your wallet.</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
