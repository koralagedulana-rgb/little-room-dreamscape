import { useId } from "react";

export type PlantType =
  | "plant"
  | "monstera"
  | "cactus"
  | "hangingplant"
  | "pothos"
  | "fern"
  | "snakeplant"
  | "ivy";

const G = {
  deep: "#16301d",
  dark: "#1f4228",
  mid: "#2d5a33",
  light: "#3f7444",
  hi: "#5a8f52",
  vein: "#0f2414",
  gold: "#c9a24f",
  goldHi: "#e8c97a",
  goldLo: "#7a5a24",
  soil: "#1a120c",
};

/** Brass gradient defs shared per-instance (unique ids). */
function Brass({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}b`} x1="0" x2="1">
        <stop offset="0" stopColor={G.goldLo} />
        <stop offset="0.35" stopColor={G.goldHi} />
        <stop offset="0.6" stopColor={G.gold} />
        <stop offset="1" stopColor={G.goldLo} />
      </linearGradient>
      <linearGradient id={`${id}l`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={G.hi} />
        <stop offset="1" stopColor={G.dark} />
      </linearGradient>
    </defs>
  );
}

function Shadow({ cx, cy, rx }: { cx: number; cy: number; rx: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.16} fill="#000" opacity="0.35" />;
}

/** A veined pointed leaf drawn upward from (0,0) with length l. */
function Leaf({ l, w, fill, rot, x, y }: { l: number; w: number; fill: string; rot: number; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={`M0 0 Q${w} ${-l * 0.45} 0 ${-l} Q${-w} ${-l * 0.45} 0 0Z`} fill={fill} />
      <path d={`M0 0 L0 ${-l * 0.92}`} stroke={G.vein} strokeWidth="0.7" opacity="0.6" />
      <path d={`M${-w * 0.3} ${-l * 0.6} Q${-w * 0.1} ${-l * 0.55} 0 ${-l * 0.4}`} stroke={G.goldHi} strokeWidth="0.4" fill="none" opacity="0.25" />
    </g>
  );
}

function Heart({ x, y, s, rot, fill }: { x: number; y: number; s: number; rot: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C-6 -2 -7 -9 -2 -10 C0 -10 0 -8 0 -8 C0 -8 0 -10 2 -10 C7 -9 6 -2 0 0Z" fill={fill} />
      <path d="M0 -1 L0 -8" stroke={G.vein} strokeWidth="0.5" opacity="0.6" />
      <path d="M-2 -6 Q-1 -4 0 -3" stroke="#d8c36a" strokeWidth="0.6" fill="none" opacity="0.5" />
    </g>
  );
}

export function PlantArt({ type }: { type: PlantType }) {
  const id = useId().replace(/:/g, "");
  const brass = `url(#${id}b)`;
  const leafG = `url(#${id}l)`;

  switch (type) {
    case "plant":
      return (
        <svg viewBox="0 0 80 120" className="h-full w-full overflow-visible">
          <Brass id={id} />
          <Shadow cx={40} cy={119} rx={24} />
          <g className="room-sway" style={{ transformOrigin: "40px 80px" }}>
            {[
              [-55, 24, G.dark], [52, 24, G.dark], [-30, 30, G.mid], [28, 30, G.mid],
              [-12, 34, G.light], [12, 32, G.light], [0, 38, G.hi], [-42, 20, G.light], [40, 20, G.light],
            ].map(([r, l, f], i) => (
              <Leaf key={i} x={40} y={78} l={l as number} w={8} rot={r as number} fill={f as string} />
            ))}
          </g>
          <ellipse cx="40" cy="80" rx="21" ry="3.5" fill={G.soil} />
          <path d="M20 80 H60 Q58 100 52 108 H28 Q22 100 20 80Z" fill={brass} />
          {[26, 33, 40, 47, 54].map((x) => (
            <path key={x} d={`M${x} 83 Q${x + (40 - x) * 0.15} 96 ${x + (40 - x) * 0.25} 106`} stroke={G.goldLo} strokeWidth="0.8" fill="none" opacity="0.6" />
          ))}
          <rect x="17" y="76" width="46" height="5" rx="2" fill={brass} />
          {[20, 26, 32, 38, 44, 50, 56].map((x) => <circle key={x} cx={x + 2} cy="78.5" r="0.9" fill={G.goldHi} />)}
          <path d="M32 108 H48 L52 117 H28Z" fill={brass} />
        </svg>
      );
    case "monstera":
      return (
        <svg viewBox="0 0 100 140" className="h-full w-full overflow-visible">
          <Brass id={id} />
          <Shadow cx={50} cy={139} rx={28} />
          <g className="room-sway" style={{ transformOrigin: "50px 100px" }}>
            {[
              [-48, 38, 0], [46, 36, 1], [-20, 50, 1], [18, 52, 0], [0, 62, 1], [-36, 26, 0], [32, 28, 1],
            ].map(([r, len, f], i) => {
              const L = len as number;
              return (
                <g key={i} transform={`rotate(${r} 50 100)`}>
                  <path d={`M50 100 Q51 ${100 - L * 0.5} 50 ${100 - L}`} stroke={G.dark} strokeWidth="1.4" fill="none" />
                  <g transform={`translate(50 ${100 - L})`}>
                    <path
                      d="M0 4 C-16 4 -18 -12 -10 -20 C-6 -24 -2 -24 0 -22 C2 -24 6 -24 10 -20 C18 -12 16 4 0 4Z"
                      fill={f ? G.mid : G.light}
                    />
                    {/* fenestrations */}
                    {[-1, 1].map((s) =>
                      [-15, -9, -3].map((yy, k) => (
                        <path key={`${s}${k}`} d={`M${s * 4} ${yy} L${s * 14} ${yy - 2} L${s * 13} ${yy + 2}Z`} fill={G.deep} opacity="0.85" />
                      )),
                    )}
                    {[-1, 1].map((s) => <ellipse key={s} cx={s * 6} cy="-6" rx="1.2" ry="2" fill={G.deep} />)}
                    <path d="M0 4 L0 -21" stroke={G.vein} strokeWidth="0.8" />
                  </g>
                </g>
              );
            })}
          </g>
          <ellipse cx="50" cy="100" rx="19" ry="3" fill={G.soil} />
          <path d="M31 100 H69 L64 126 H36Z" fill={brass} />
          <path d="M33 108 H67" stroke={G.goldLo} strokeWidth="1" />
          <path d="M34 118 H66" stroke={G.goldLo} strokeWidth="0.8" opacity="0.7" />
          <rect x="28" y="96" width="44" height="5" rx="2" fill={brass} />
          <path d="M38 126 H62 L58 132 H42Z" fill={G.goldLo} />
          <path d="M36 132 H64 V136 H36Z" fill={brass} />
        </svg>
      );
    case "cactus":
      return (
        <svg viewBox="0 0 60 96" className="h-full w-full overflow-visible">
          <Brass id={id} />
          <Shadow cx={30} cy={95} rx={17} />
          <g className="room-sway" style={{ transformOrigin: "30px 70px" }}>
            <rect x="22" y="10" width="16" height="62" rx="8" fill={leafG} />
            <path d="M8 50 V34 a5 5 0 0 1 10 0 V44 H24 V52 H12 a4 4 0 0 1 -4 -2Z" fill={G.mid} />
            <path d="M52 44 V26 a5 5 0 0 0 -10 0 V38 H36 V46 H48 a4 4 0 0 0 4 -2Z" fill={G.mid} />
            {[26, 30, 34].map((x) => <path key={x} d={`M${x} 14 V70`} stroke={G.deep} strokeWidth="0.7" opacity="0.6" />)}
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i} stroke="#e8dcb0" strokeWidth="0.4" opacity="0.7">
                <path d={`M${24 + (i % 3) * 6} ${16 + i * 5.5} l-2 -1 M${24 + (i % 3) * 6} ${16 + i * 5.5} l2 -1`} />
              </g>
            ))}
            <circle cx="30" cy="9" r="3.5" fill="#b05a6a" />
            <circle cx="30" cy="9" r="1.4" fill="#e3a0a8" />
          </g>
          <ellipse cx="30" cy="70" rx="14" ry="2.5" fill={G.soil} />
          <path d="M16 70 H44 L40 92 H20Z" fill="#6a3424" />
          <path d="M18 78 H42" stroke="#4a2218" strokeWidth="0.8" />
          <path d="M22 74 Q24 84 21 90" stroke="#3a5a3a" strokeWidth="1.2" fill="none" opacity="0.4" />
          <rect x="13" y="66" width="34" height="6" rx="2" fill="#8a4630" />
          <rect x="18" y="92" width="24" height="3" rx="1" fill={brass} />
        </svg>
      );
    case "hangingplant":
      return (
        <svg viewBox="0 0 80 144" className="h-full w-full overflow-visible">
          <Brass id={id} />
          <circle cx="40" cy="2" r="2.5" fill="none" stroke={G.gold} strokeWidth="1.2" />
          {[24, 40, 56].map((x) => (
            <path key={x} d={`M40 4 L${x} 34`} stroke={G.gold} strokeWidth="0.9" strokeDasharray="1.6 1" />
          ))}
          <g className="room-sway" style={{ transformOrigin: "40px 58px" }}>
            {Array.from({ length: 7 }, (_, i) => {
              const x = 18 + i * 7.3;
              const len = 50 + ((i * 37) % 5) * 10;
              const d = i % 2 ? 5 : -5;
              return (
                <g key={i}>
                  <path d={`M${x} 52 Q${x + d} ${52 + len / 2} ${x} ${52 + len}`} stroke={G.dark} strokeWidth="0.8" fill="none" />
                  {Array.from({ length: Math.floor(len / 6) }, (_, j) => {
                    const t = (j + 1) / (len / 6 + 1);
                    const px = x + d * Math.sin(t * Math.PI) * 1.0;
                    return <circle key={j} cx={px + (j % 2 ? 1.2 : -1.2)} cy={52 + len * t} r="1.8" fill={j % 3 ? G.light : G.hi} />;
                  })}
                </g>
              );
            })}
          </g>
          {[[26, 34, -40], [54, 34, 40], [34, 30, -15], [46, 30, 15]].map(([x, y, r], i) => (
            <Leaf key={i} x={x} y={y} l={12} w={4} rot={r} fill={G.mid} />
          ))}
          <path d="M22 34 H58 Q58 52 48 58 H32 Q22 52 22 34Z" fill={brass} />
          {[28, 34, 40, 46, 52].map((x) => <path key={x} d={`M${x} 36 Q${x + (40 - x) * 0.2} 48 ${x + (40 - x) * 0.4} 56`} stroke={G.goldLo} strokeWidth="0.7" fill="none" />)}
          <rect x="20" y="32" width="40" height="4" rx="2" fill={brass} />
        </svg>
      );
    case "pothos":
      return (
        <svg viewBox="0 0 80 128" className="h-full w-full overflow-visible">
          <Brass id={id} />
          {[
            [22, 48, 108, -1], [34, 48, 124, 0], [48, 48, 116, 1], [60, 44, 96, 1], [16, 40, 88, -1],
          ].map(([x, y0, y1, d], i) => (
            <g key={i} className="room-sway" style={{ transformOrigin: `${x}px ${y0}px`, animationDelay: `${i * 0.5}s` }}>
              <path d={`M${x} ${y0} Q${x + d * 8} ${(y0 + y1) / 2} ${x + d * 3} ${y1}`} stroke={G.dark} strokeWidth="1" fill="none" />
              {Array.from({ length: 7 }, (_, j) => {
                const t = (j + 1) / 8;
                const ty = y0 + (y1 - y0) * t;
                const tx = x + d * 8 * Math.sin(t * Math.PI) * 0.9;
                return <Heart key={j} x={tx} y={ty + 8} s={0.75 - j * 0.03} rot={j % 2 ? 160 : 200} fill={j % 2 ? G.light : G.mid} />;
              })}
            </g>
          ))}
          {[[20, 24, -50], [30, 18, -25], [40, 14, 0], [50, 18, 25], [60, 24, 50], [26, 26, -70], [54, 26, 70]].map(([x, y, r], i) => (
            <Heart key={i} x={x} y={y + 6} s={1.05} rot={r} fill={i % 2 ? G.mid : G.light} />
          ))}
          <path d="M16 28 H64 L60 50 H20Z" fill="#3a2214" />
          <path d="M19 32 H61 L58 47 H22Z" fill="none" stroke={G.gold} strokeWidth="0.8" />
          <circle cx="40" cy="39.5" r="3" fill={brass} />
          <rect x="13" y="24" width="54" height="5" rx="2" fill={brass} />
        </svg>
      );
    case "fern":
      return (
        <svg viewBox="0 0 100 110" className="h-full w-full overflow-visible">
          <Brass id={id} />
          <Shadow cx={50} cy={108} rx={24} />
          {[-78, -55, -32, -12, 8, 28, 50, 74].map((a, i) => (
            <g key={i} transform={`rotate(${a} 50 72)`}>
              <g className="room-sway" style={{ transformOrigin: "50px 72px", animationDelay: `${i * 0.4}s` }}>
                <path d="M50 72 Q46 40 52 6" stroke={G.dark} strokeWidth="1.1" fill="none" />
                {Array.from({ length: 13 }, (_, j) => {
                  const t = j / 13;
                  const y = 68 - j * 4.8;
                  const x = 50 - 3 * Math.sin(t * Math.PI) + t * 2;
                  const l = 9 * (1 - t * 0.75);
                  const f = j % 2 ? G.mid : G.light;
                  return (
                    <g key={j}>
                      <path d={`M${x} ${y} q${-l * 0.5} -3 ${-l} 0 q${l * 0.5} 2 ${l} 0z`} fill={f} />
                      <path d={`M${x} ${y} q${l * 0.5} -3 ${l} 0 q${-l * 0.5} 2 ${-l} 0z`} fill={j % 2 ? G.light : G.hi} />
                    </g>
                  );
                })}
              </g>
            </g>
          ))}
          <ellipse cx="50" cy="74" rx="24" ry="3" fill={G.soil} />
          <path d="M26 74 H74 Q72 94 60 100 H40 Q28 94 26 74Z" fill="#6a4a22" />
          <path d="M26 74 H74 Q72 94 60 100 H40 Q28 94 26 74Z" fill={brass} opacity="0.75" />
          <path d="M30 84 H70" stroke={G.goldLo} strokeWidth="0.8" />
          <rect x="23" y="71" width="54" height="4" rx="2" fill={brass} />
          <path d="M42 100 H58 L60 106 H40Z" fill={brass} />
        </svg>
      );
    case "snakeplant":
      return (
        <svg viewBox="0 0 60 114" className="h-full w-full overflow-visible">
          <Brass id={id} />
          <Shadow cx={30} cy={112} rx={18} />
          {[
            [16, 22, -8], [24, 4, -3], [33, 8, 3], [42, 24, 9], [29, 30, 0], [20, 36, -5],
          ].map(([x, top, lean], i) => {
            const mid = (80 + top) / 2;
            return (
              <g key={i}>
                <path d={`M${x - 4.5} 80 Q${x + lean / 2 - 6} ${mid} ${x + lean} ${top} Q${x + lean / 2 + 6} ${mid} ${x + 4.5} 80Z`} fill="#c9b04a" />
                <path d={`M${x - 3.3} 80 Q${x + lean / 2 - 4.6} ${mid} ${x + lean} ${top + 4} Q${x + lean / 2 + 4.6} ${mid} ${x + 3.3} 80Z`} fill={i % 2 ? G.mid : G.dark} />
                {Array.from({ length: 6 }, (_, j) => {
                  const yy = 76 - j * ((76 - top - 6) / 6);
                  const t = (76 - yy) / (80 - top);
                  const cx = x + lean * t;
                  return <path key={j} d={`M${cx - 2.5} ${yy} q2.5 -1.5 5 0`} stroke={G.hi} strokeWidth="0.6" fill="none" opacity="0.6" />;
                })}
              </g>
            );
          })}
          <ellipse cx="30" cy="80" rx="17" ry="2.5" fill={G.soil} />
          <path d="M12 80 H48 Q47 98 42 104 H18 Q13 98 12 80Z" fill="#1c2420" />
          <path d="M15 84 Q16 96 20 101" stroke="#4a5a52" strokeWidth="1.4" fill="none" opacity="0.6" />
          <rect x="10" y="77" width="40" height="4" rx="2" fill={brass} />
          <rect x="16" y="104" width="28" height="5" rx="1.5" fill={brass} />
        </svg>
      );
    case "ivy":
      return (
        <svg viewBox="0 0 140 182" className="h-full w-full overflow-visible">
          <Brass id={id} />
          {[
            "M10 0 Q30 60 18 120 Q10 160 26 180",
            "M50 0 Q60 50 44 90 Q34 130 52 150",
            "M95 0 Q80 40 96 80 Q110 120 90 170",
            "M130 0 Q120 30 128 70 Q134 100 118 120",
          ].map((d, i) => (
            <g key={i} className="room-sway" style={{ transformOrigin: "70px 0px", animationDelay: `${i * 0.7}s` }}>
              <path d={d} stroke="#3a2a1a" strokeWidth="1.4" fill="none" />
              <path d={d} stroke={G.dark} strokeWidth="0.6" fill="none" />
            </g>
          ))}
          {Array.from({ length: 46 }, (_, i) => {
            const col = i % 4;
            const xs = [[10, 30, 18, 10, 26], [50, 60, 44, 34, 52], [95, 80, 96, 110, 90], [130, 120, 128, 134, 118]][col];
            const maxY = [180, 150, 170, 120][col];
            const t = Math.floor(i / 4) / 11.5;
            const y = t * maxY;
            const seg = Math.min(3, Math.floor(t * 4));
            const x = xs[seg] + (xs[seg + 1] - xs[seg]) * (t * 4 - seg) * 0.6 + (i % 2 ? 4 : -4);
            const s = 0.55 + ((i * 7) % 5) * 0.06;
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 47) % 360 - 180 > 0 ? 20 : -20}) scale(${s})`}>
                <path
                  d="M0 2 L-3 -2 L-9 -1 L-6 -6 L-8 -12 L-2 -9 L0 -15 L2 -9 L8 -12 L6 -6 L9 -1 L3 -2Z"
                  fill={i % 3 === 0 ? G.light : i % 3 === 1 ? G.mid : G.dark}
                  stroke={G.deep}
                  strokeWidth="0.4"
                  strokeLinejoin="round"
                />
                <path d="M0 2 L0 -12 M0 -4 L-6 -7 M0 -4 L6 -7" stroke="#b8c48a" strokeWidth="0.5" opacity="0.55" />
              </g>
            );
          })}
        </svg>
      );
  }
}
