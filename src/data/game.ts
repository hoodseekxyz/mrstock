export const PAIR = "0x117cc2133c37b721f49de2a7a74833232b3b4c0c";
export const CHAIN_ID = 4663;
export const CHAIN_NAME = "Robinhood Chain";
export const SUPPLY = 1_000_000_000;
export const MIN_HOLD = 100_000;
export const ELIGIBLE_ASSUMPTION = 0.7;
export const LAUNCH_URL = "https://letscash.fun/launch";
export const PAIR_URL = `https://robinhoodchain.blockscout.com/address/${PAIR}`;

export const SPLIT = [
  { key: "holders", pct: 4, label: "Holders", note: "Buys the ten seats, equal, pushed in kind" },
  { key: "desk", pct: 0.7, label: "Desk", note: "Build, gas, the crank" },
  { key: "pad", pct: 0.3, label: "LetsCash", note: "Platform, set at launch" },
] as const;

export type Stat = { label: string; value: number };

export type Trader = {
  id: string;
  name: string;
  code: string;
  photo: string;
  face: string;
  signature: string;
  stance: "GOOFY" | "REGULAR";
  bio: string;
  line: string;
  stats: Stat[];
  chart: number[];
};

const STATS = [
  "Market vision",
  "Risk tolerance",
  "Technical analysis",
  "Fundamentals",
  "Hang time",
  "Portfolio diversity",
  "Leverage",
  "Discipline",
  "Chaos",
] as const;

function stats(values: number[]): Stat[] {
  return STATS.map((label, i) => ({ label, value: values[i] ?? 0 }));
}

export const TRADERS: Trader[] = [
  {
    id: "tony",
    name: "Tony Stock",
    code: "TST-001",
    photo: "/riders/tony.jpg",
    face: "/riders/tony-face.jpg",
    signature: "Tony Stock",
    stance: "GOOFY",
    bio: "Wall Street legend. Markets, maneuvers, and massive returns. Tony Stock blends precision, risk and creativity like no one else. Numbers are just another line to ride.",
    line: "Numbers are just another line. Drop in.",
    stats: stats([7, 5, 6, 4, 8, 5, 3, 6, 7]),
    chart: [18, 22, 21, 28, 34, 33, 41, 48, 46, 55, 62, 74],
  },
  {
    id: "bear",
    name: "Bear Stearns",
    code: "BRS-001",
    photo: "/riders/bear.jpg",
    face: "/riders/bear-face.jpg",
    signature: "Bear Stearns",
    stance: "REGULAR",
    bio: "Lives for the next trade. If there's a loophole, he'll find it, leverage it, and double it. Discipline is for other people. It worked yesterday, it'll work again.",
    line: "Loophole. Leverage. Double. Next trade.",
    stats: stats([8, 9, 6, 5, 4, 3, 9, 2, 8]),
    chart: [40, 36, 44, 38, 52, 48, 61, 58, 70, 66, 78, 84],
  },
  {
    id: "ray",
    name: "Ray D'Ollie-O",
    code: "RDO-013",
    photo: "/riders/ray.jpg",
    face: "/riders/ray-face.jpg",
    signature: "Ray D'Ollie-O",
    stance: "REGULAR",
    bio: "Has a principle for every trick and a 400-page explanation for every fall. Before he drops in, everyone must agree on what a ramp is.",
    line: "Agree on the ramp. Then we drop.",
    stats: stats([8, 4, 5, 9, 6, 8, 3, 9, 2]),
    chart: [22, 24, 27, 29, 33, 36, 40, 44, 49, 53, 58, 63],
  },
  {
    id: "warren",
    name: "Warren Shreddit",
    code: "WSR-011",
    photo: "/riders/warren.jpg",
    face: "/riders/warren-face.jpg",
    signature: "Warren Shreddit",
    stance: "GOOFY",
    bio: "Half trader, half shredder. Finds alpha in unexpected places. Same lines on a mountain or a chart — discipline, flow, and conviction. The best trades, and the best runs, come from thinking differently.",
    line: "Think differently. Then push.",
    stats: stats([9, 3, 4, 8, 5, 7, 2, 9, 3]),
    chart: [30, 32, 31, 36, 35, 42, 48, 47, 54, 60, 66, 71],
  },
  {
    id: "wolf",
    name: "Wolf of Wall Ride",
    code: "WWR-007",
    photo: "/riders/wolf.jpg",
    face: "/riders/wolf-face.jpg",
    signature: "Wolf of Wall Ride",
    stance: "REGULAR",
    bio: "Part trader, part skater, all momentum. The Wolf of Wall Ride turns volatility into a playground. He sees markets like spots — lines everywhere, opportunity in motion. Buy low, pop high, never stop rolling.",
    line: "Street, Mr. Stock. Big doll. One shot, big doll. Level one. Blockbusters up.",
    stats: stats([6, 8, 5, 3, 9, 4, 8, 3, 9]),
    chart: [16, 28, 24, 40, 36, 52, 48, 64, 58, 76, 70, 88],
  },
];

export type Seat = {
  ticker: string;
  name: string;
  rider: string;
  face: string;
  base: number;
  blurb: string;
};

export const SEATS: Seat[] = [
  {
    ticker: "SPYLINE",
    name: "The pair on the wall",
    rider: "Tony Stock",
    face: "/riders/tony-face.jpg",
    base: 456.7,
    blurb: "The tape everyone stares at. A desk seat, not a share of any fund.",
  },
  {
    ticker: "NASPOP",
    name: "Hang time",
    rider: "Wolf of Wall Ride",
    face: "/riders/wolf-face.jpg",
    base: 142.36,
    blurb: "Noisy tech tape. Pop high, eat floor, keep the line.",
  },
  {
    ticker: "DOWOLLIE",
    name: "The slow ramp",
    rider: "Ray D'Ollie-O",
    face: "/riders/ray-face.jpg",
    base: 356.78,
    blurb: "A long explanation and a gentle ramp. Agree on the drop.",
  },
  {
    ticker: "VIXKICK",
    name: "Chaos seat",
    rider: "Bear Stearns",
    face: "/riders/bear-face.jpg",
    base: 18.4,
    blurb: "Volatility as a playground. Can go to zero. So can the coin.",
  },
  {
    ticker: "BULLRUN",
    name: "The statue",
    rider: "Tony Stock",
    face: "/riders/tony-face.jpg",
    base: 88.2,
    blurb: "Chrome bull energy. Momentum until it isn't.",
  },
  {
    ticker: "BEARPUT",
    name: "The briefcase",
    rider: "Bear Stearns",
    face: "/riders/bear-face.jpg",
    base: 64.5,
    blurb: "Loophole, leverage, the other side of the ramp.",
  },
  {
    ticker: "SHRED",
    name: "Unexpected alpha",
    rider: "Warren Shreddit",
    face: "/riders/warren-face.jpg",
    base: 27.15,
    blurb: "Same line on a mountain or a chart. Think differently.",
  },
  {
    ticker: "WOLFR",
    name: "Never stop rolling",
    rider: "Wolf of Wall Ride",
    face: "/riders/wolf-face.jpg",
    base: 33.9,
    blurb: "Buy low, pop high. Level one. Blockbusters up.",
  },
  {
    ticker: "TONY",
    name: "Goofy line",
    rider: "Tony Stock",
    face: "/riders/tony-face.jpg",
    base: 12.48,
    blurb: "Numbers are a line. Ride it regular or goofy.",
  },
  {
    ticker: "BLOCK",
    name: "Level one",
    rider: "Warren Shreddit",
    face: "/riders/warren-face.jpg",
    base: 9.71,
    blurb: "One shot, big doll. The seat that pays for the clip.",
  },
];

export function oppositeStance(stance: "GOOFY" | "REGULAR"): "GOOFY" | "REGULAR" {
  return stance === "GOOFY" ? "REGULAR" : "GOOFY";
}

export function practicePrice(base: number, seed: number, now: number): number {
  const t = now / 1000;
  const wave = Math.sin(t / 16 + seed) * 0.018 + Math.sin(t / 4.2 + seed * 1.7) * 0.006;
  return base * (1 + wave);
}

export function romeClock(now = new Date()): { h: number; min: number; s: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const grab = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  return { h: grab("hour"), min: grab("minute"), s: grab("second") };
}

export function secondsToEpoch(now = new Date()): number {
  const { h, min, s } = romeClock(now);
  const sec = h * 3600 + min * 60 + s;
  const marks = [0, 8 * 3600, 16 * 3600, 24 * 3600];
  const next = marks.find((m) => m > sec) ?? 24 * 3600;
  return next - sec;
}

export function formatClock(total: number): string {
  const s = Math.max(0, Math.floor(total));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return [h, m, r].map((n) => String(n).padStart(2, "0")).join(":");
}

export function formatUsd(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  }
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function formatNum(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
