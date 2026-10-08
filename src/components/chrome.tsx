import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BASKET, DESK_WALLET, LAUNCH_LINE, QUOTE, X_HANDLE, X_URL, tokenUrl } from "@/data/game";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand-compact" : "brand"} aria-label="Tony Stock Pro Trader">
      <div className="brand-oval">
        <span className="brand-top">Tony Stock</span>
        <span className="brand-bot">Pro Trader</span>
        <svg className="brand-line" viewBox="0 0 220 40" aria-hidden="true">
          <path d="M6 30 C 28 28, 40 16, 62 18 S 96 6, 118 14 S 160 8, 206 12" />
          <path d="M176 10 L208 6 L196 18" className="brand-arrow" />
        </svg>
      </div>
    </div>
  );
}

export function ModeNav({ current }: { current: "ride" | "desk" | "rules" }) {
  const items = [
    { id: "ride" as const, to: "/", label: "Ride" },
    { id: "desk" as const, to: "/desk", label: "Desk" },
    { id: "rules" as const, to: "/rules", label: "Rules" },
  ];
  return (
    <nav className="mode-nav" aria-label="Sections">
      {items.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className={item.id === current ? "mode-link on" : "mode-link"}
          aria-current={item.id === current ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function CaBox({ tone = "metal" }: { tone?: "metal" | "inset" }) {
  return (
    <div className={tone === "metal" ? "metal ca-box" : "ca-box inset"} aria-label="Launch status">
      <span className="ca-label">Soon</span>
      <p className="ca-soon">{LAUNCH_LINE}</p>
      <a className="ca-x" href={X_URL} target="_blank" rel="noreferrer">
        {X_HANDLE}
      </a>
    </div>
  );
}

export function CopyLine({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="copy-line"
      onClick={() => {
        navigator.clipboard.writeText(value).then(
          () => setCopied(true),
          () => setCopied(false),
        );
      }}
    >
      <b>{label}</b>
      <span className="mono">{copied ? "Copied" : value}</span>
    </button>
  );
}

export function BasketList() {
  return (
    <div className="basket">
      {BASKET.map((seat) => (
        <div className="basket-row" key={seat.symbol}>
          <CopyLine label={seat.symbol} value={seat.address} />
          <a href={tokenUrl(seat.address)} target="_blank" rel="noreferrer">
            {seat.name}
          </a>
        </div>
      ))}
      <p className="basket-note">
        Pool is {QUOTE}. These three are locked when the helper deploys. Nothing gets added inside
        that contract. A fourth name is a new helper, and LetsCash can hand the fee stream to it.
        The desk wallet takes the 0.7% only.
      </p>
      <CopyLine label="Desk" value={DESK_WALLET} />
    </div>
  );
}

export function GlobeMark() {
  return (
    <svg className="globe" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="15" />
      <ellipse cx="24" cy="24" rx="6.5" ry="15" />
      <path d="M9 24h30M11 17h26M11 31h26" />
    </svg>
  );
}

export function Spark({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const d = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 120;
      const y = 28 - ((v - min) / span) * 24;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg className="spark" viewBox="0 0 120 32" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function Meter({ value }: { value: number }) {
  return (
    <span className="meter" aria-label={`${value} of 10`}>
      {Array.from({ length: 10 }, (_, i) => {
        let tone = "off";
        if (i < value) {
          const t = i / 9;
          tone = t < 0.45 ? "blue" : t < 0.72 ? "gold" : "go";
        }
        return <i key={i} className={tone} />;
      })}
    </span>
  );
}

export function MiniChart({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const coords = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 200;
    const y = 86 - ((v - min) / span) * 70;
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const area = `${line} L200 100 L0 100 Z`;
  return (
    <svg className="mini-chart" viewBox="0 0 200 100" role="img" aria-label="Desk line, January to June">
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" y1={y} x2="200" y2={y} className="grid" />
      ))}
      <path d={area} className="area" />
      <path d={line} className="line" />
    </svg>
  );
}
