import type { ItemType } from "@/lib/room";

// Illustrated artwork for each room item. Colors here are part of the illustration itself.
export function ItemArt({ type }: { type: ItemType }) {
  switch (type) {
    case "window":
      return (
        <svg viewBox="0 0 100 110" className="h-full w-full">
          <rect x="4" y="4" width="92" height="96" rx="4" fill="#f4efe6" />
          <rect x="11" y="11" width="78" height="82" fill="var(--room-sky)" />
          <circle cx="68" cy="30" r="8" fill="var(--room-sun)" className="room-twinkle" />
          <path d="M11 78 Q35 62 55 74 T89 70 V93 H11Z" fill="var(--room-hill)" />
          <rect x="48" y="11" width="4" height="82" fill="#f4efe6" />
          <rect x="11" y="50" width="78" height="4" fill="#f4efe6" />
          <rect x="0" y="98" width="100" height="8" rx="2" fill="#e6dccb" />
        </svg>
      );
    case "lights":
      return (
        <svg viewBox="0 0 400 48" className="h-full w-full overflow-visible">
          <path d="M0 6 Q100 40 200 10 T400 8" stroke="#6b5a48" strokeWidth="1.5" fill="none" />
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 14 + i * 28;
            const t = x / 400;
            const y = t < 0.5 ? 6 + Math.sin(t * 2 * Math.PI) * 18 + 8 : 10 + Math.sin((t - 0.5) * 2 * Math.PI) * 12;
            return (
              <g key={i} className="room-bulb" style={{ animationDelay: `${i * 0.23}s` }}>
                <circle cx={x} cy={y + 6} r="9" fill="var(--room-bulb)" opacity="0.35" />
                <ellipse cx={x} cy={y + 6} rx="3.2" ry="4.5" fill="var(--room-bulb)" />
              </g>
            );
          })}
        </svg>
      );
    case "corkboard":
      return (
        <svg viewBox="0 0 200 144" className="h-full w-full">
          <rect x="0" y="0" width="200" height="144" rx="4" fill="#8a5a36" />
          <rect x="8" y="8" width="184" height="128" fill="#c99a63" />
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 47) % 180 + 12} cy={(i * 31) % 120 + 12} r="1" fill="#a87a48" />
          ))}
          <g transform="rotate(-5 45 50)">
            <rect x="22" y="22" width="46" height="54" fill="#fbfaf6" />
            <rect x="27" y="27" width="36" height="34" fill="#b9c8d6" />
            <circle cx="45" cy="40" r="7" fill="#7b5a49" />
          </g>
          <circle cx="45" cy="22" r="3.5" fill="#d94b3d" />
          <rect x="120" y="70" width="40" height="38" fill="#f6dd5c" transform="rotate(4 140 89)" />
          <text x="140" y="92" fontSize="9" textAnchor="middle" fill="#5a4a20" fontFamily="Gaegu, cursive" transform="rotate(4 140 89)">drink water ♡</text>
          <rect x="105" y="20" width="60" height="30" fill="#f2c6c2" transform="rotate(-3 135 35)" />
          <circle cx="135" cy="20" r="3" fill="#3d7bd9" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 80 100" className="h-full w-full">
          <rect x="2" y="8" width="76" height="90" rx="4" fill="#fbfaf6" stroke="#e2dacb" />
          <rect x="2" y="8" width="76" height="24" rx="4" fill="#d9453b" />
          {[14, 28, 42, 56, 70].map((x) => <rect key={x} x={x - 2} y="2" width="4" height="12" rx="2" fill="#555" />)}
          <text x="40" y="26" fontSize="11" textAnchor="middle" fill="#fff" fontWeight="700" letterSpacing="2">{new Date().toLocaleString("en", { month: "short" }).toUpperCase()}</text>
          <text x="40" y="74" fontSize="38" textAnchor="middle" fill="#2b2b2b" fontWeight="800">{new Date().getDate()}</text>
          <text x="40" y="90" fontSize="8" textAnchor="middle" fill="#888" letterSpacing="2">{new Date().toLocaleString("en", { weekday: "long" }).toUpperCase()}</text>
        </svg>
      );
    case "clock": {
      const d = new Date();
      const h = ((d.getHours() % 12) + d.getMinutes() / 60) * 30;
      const m = d.getMinutes() * 6;
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="46" fill="#6b4a33" />
          <circle cx="50" cy="50" r="39" fill="#fbf6ec" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="49" y="15" width="2" height="6" fill="#6b4a33" transform={`rotate(${i * 30} 50 50)`} />
          ))}
          <rect x="48.5" y="28" width="3" height="23" rx="1.5" fill="#3a2a1e" transform={`rotate(${h} 50 50)`} />
          <rect x="49.2" y="19" width="1.6" height="32" rx="1" fill="#3a2a1e" transform={`rotate(${m} 50 50)`} />
          <rect x="49.6" y="17" width="0.8" height="36" fill="#d9453b" className="room-second" style={{ transformOrigin: "50px 50px" }} />
          <circle cx="50" cy="50" r="3" fill="#d9453b" />
        </svg>
      );
    }
    case "frame":
      return (
        <svg viewBox="0 0 80 96" className="h-full w-full">
          <rect width="80" height="96" rx="3" fill="#2f2a26" />
          <rect x="7" y="7" width="66" height="82" fill="#f7f1e6" />
          <rect x="14" y="14" width="52" height="56" fill="var(--room-sky)" />
          <circle cx="40" cy="44" r="12" fill="var(--room-sun)" />
          <path d="M14 62 Q30 52 40 60 T66 56 V70 H14Z" fill="var(--room-hill)" />
        </svg>
      );
    case "shelf":
      return (
        <svg viewBox="0 0 100 160" className="h-full w-full">
          <rect x="0" y="0" width="100" height="160" rx="3" fill="#a8774f" />
          <rect x="6" y="6" width="88" height="148" fill="#7e5434" />
          {[50, 100].map((y) => <rect key={y} x="6" y={y} width="88" height="5" fill="#a8774f" />)}
          {[
            [10, "#c9604b", 34], [20, "#e5c27a", 40], [29, "#5d7f6e", 30], [38, "#efe6d6", 38], [48, "#3f5873", 42],
          ].map(([x, c, h], i) => <rect key={i} x={x as number} y={50 - (h as number)} width="8" height={h as number} fill={c as string} />)}
          <circle cx="76" cy="38" r="10" fill="#7fa36e" /><rect x="70" y="38" width="12" height="12" fill="#d7a37a" />
          {[
            [12, "#e5c27a", 36], [22, "#efe6d6", 40], [32, "#c9604b", 34], [70, "#5d7f6e", 40], [80, "#3f5873", 36],
          ].map(([x, c, h], i) => <rect key={i} x={x as number} y={100 - (h as number)} width="9" height={h as number} fill={c as string} />)}
          <rect x="44" y="84" width="18" height="16" rx="2" fill="#f4efe6" />
          <rect x="14" y="128" width="30" height="26" rx="2" fill="#efe6d6" />
          <rect x="54" y="122" width="34" height="32" rx="2" fill="#c99a63" />
          <rect x="4" y="154" width="8" height="6" fill="#5e3f27" /><rect x="88" y="154" width="8" height="6" fill="#5e3f27" />
        </svg>
      );
    case "desk":
      return (
        <svg viewBox="0 0 200 100" className="h-full w-full">
          <rect x="0" y="0" width="200" height="10" rx="2" fill="#f1ece3" />
          <rect x="0" y="9" width="200" height="4" fill="#d9d2c4" />
          <rect x="6" y="13" width="64" height="87" fill="#ece6da" />
          {[22, 50, 78].map((y) => <g key={y}><rect x="10" y={y - 6} width="56" height="24" fill="#f4efe6" /><rect x="28" y={y + 2} width="20" height="3" rx="1.5" fill="#9b958a" /></g>)}
          <rect x="186" y="13" width="8" height="87" fill="#d9d2c4" />
        </svg>
      );
    case "rug":
      return (
        <svg viewBox="0 0 200 36" className="h-full w-full">
          <path d="M20 0 H180 L200 36 H0Z" fill="var(--room-rug)" />
          <path d="M30 4 H170 L186 32 H14Z" fill="none" stroke="var(--room-rug-line)" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
      );
    case "monitor":
      return (
        <svg viewBox="0 0 100 85" className="h-full w-full">
          <rect x="0" y="0" width="100" height="62" rx="3" fill="#222" />
          <rect x="4" y="4" width="92" height="54" fill="var(--room-screen)" />
          <rect x="10" y="12" width="36" height="4" rx="2" fill="#ffffff55" />
          <rect x="10" y="20" width="54" height="3" rx="1.5" fill="#ffffff33" />
          <rect x="10" y="26" width="44" height="3" rx="1.5" fill="#ffffff33" />
          <rect x="44" y="62" width="12" height="16" fill="#cfcfcf" />
          <rect x="30" y="78" width="40" height="7" rx="2" fill="#bdbdbd" />
        </svg>
      );
    case "lamp":
      return (
        <svg viewBox="0 0 60 90" className="h-full w-full overflow-visible">
          <path d="M14 4 H46 L56 34 H4Z" fill="#e9b872" />
          <ellipse cx="30" cy="34" rx="26" ry="4" fill="var(--room-bulb)" />
          <rect x="28" y="34" width="4" height="46" fill="#5e4a3a" />
          <ellipse cx="30" cy="84" rx="16" ry="5" fill="#5e4a3a" />
        </svg>
      );
    case "mug":
      return (
        <svg viewBox="0 0 40 44" className="h-full w-full overflow-visible">
          <g className="room-steam"><path d="M14 2 q-4 5 0 9 t0 9" stroke="#ffffff99" strokeWidth="1.6" fill="none" /><path d="M22 0 q-4 5 0 9 t0 9" stroke="#ffffff77" strokeWidth="1.6" fill="none" /></g>
          <path d="M30 22 q10 0 10 7 t-10 7" stroke="#f4efe6" strokeWidth="3.5" fill="none" />
          <rect x="4" y="18" width="28" height="24" rx="4" fill="#f4efe6" />
          <ellipse cx="18" cy="19" rx="13" ry="3" fill="#7a4e2c" />
          <ellipse cx="18" cy="43" rx="17" ry="2" fill="#b68457" />
        </svg>
      );
    case "inbox":
      return (
        <svg viewBox="0 0 100 38" className="h-full w-full">
          <path d="M8 0 H92 L100 10 V38 H0 V10Z" fill="#2f2f33" />
          <path d="M8 0 H92 L96 6 H4Z" fill="#45454b" />
          <rect x="30" y="18" width="40" height="11" fill="#f4efe6" />
          <text x="50" y="27" fontSize="8" textAnchor="middle" fontWeight="800" letterSpacing="2" fill="#2f2f33">INBOX</text>
        </svg>
      );
    case "books":
      return (
        <svg viewBox="0 0 60 42" className="h-full w-full">
          <rect x="4" y="30" width="52" height="12" rx="1" fill="#3f5873" />
          <rect x="8" y="18" width="46" height="12" rx="1" fill="#e5c27a" />
          <rect x="2" y="6" width="48" height="12" rx="1" fill="#c9604b" />
          <rect x="2" y="10" width="48" height="2" fill="#f4efe6" opacity=".5" />
        </svg>
      );
    case "plant":
      return (
        <svg viewBox="0 0 80 120" className="h-full w-full">
          <g className="room-sway" style={{ transformOrigin: "40px 80px" }}>
            {[[-40, 30], [-15, 20], [10, 16], [35, 26], [-60, 50], [58, 48], [0, 6]].map(([r, y], i) => (
              <ellipse key={i} cx="40" cy={y} rx="9" ry="26" fill={i % 2 ? "#6e9a62" : "#86b075"} transform={`rotate(${r} 40 80)`} />
            ))}
          </g>
          <path d="M18 78 H62 L56 120 H24Z" fill="#d48a62" />
          <rect x="14" y="74" width="52" height="8" rx="2" fill="#c27a54" />
        </svg>
      );
    case "cat":
      return (
        <svg viewBox="0 0 100 55" className="h-full w-full overflow-visible">
          <ellipse cx="50" cy="50" rx="48" ry="5" fill="#00000022" />
          <g className="room-breathe" style={{ transformOrigin: "50px 50px" }}>
            <path d="M88 44 Q100 30 86 24" stroke="#e39b5a" strokeWidth="7" strokeLinecap="round" fill="none" />
            <ellipse cx="52" cy="36" rx="38" ry="16" fill="#e39b5a" />
            <path d="M36 26 q8 -4 14 0 M54 24 q8 -4 14 0" stroke="#c97b3c" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="20" cy="38" r="15" fill="#eda866" />
            <path d="M8 30 L10 16 L20 26Z M24 25 L32 14 L34 30Z" fill="#eda866" />
            <path d="M12 39 q3 2 6 0 M23 39 q3 2 6 0" stroke="#5a3a22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <ellipse cx="20" cy="45" rx="5" ry="2.5" fill="#f7d3b0" />
          </g>
          <text x="10" y="8" fontSize="10" fill="var(--room-ink)" className="room-zzz" fontFamily="Gaegu, cursive">z z</text>
        </svg>
      );
    case "trash":
      return (
        <svg viewBox="0 0 60 72" className="h-full w-full">
          <ellipse cx="30" cy="8" rx="28" ry="7" fill="#5f6875" />
          <ellipse cx="30" cy="8" rx="24" ry="5" fill="#2f343b" />
          <path d="M2 8 L8 70 H52 L58 8 Q30 16 2 8Z" fill="#8a94a1" />
          {[14, 22, 30, 38, 46].map((x) => <line key={x} x1={x} y1="16" x2={x + (x - 30) * 0.08} y2="66" stroke="#78818d" strokeWidth="1.2" />)}
        </svg>
      );
  }
}
