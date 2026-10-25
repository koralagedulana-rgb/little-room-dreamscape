import type { ItemType } from "@/lib/room";

// Illustrated artwork for each room item. Colors here are part of the illustration itself.
export function ItemArt({ type, photo }: { type: ItemType; photo?: string | undefined }) {
  switch (type) {
    case "window":
      return (
        <svg viewBox="0 0 100 110" className="h-full w-full">
          <rect x="4" y="4" width="92" height="96" rx="4" fill="#d9c9a3" />
          <rect x="11" y="11" width="78" height="82" fill="var(--room-sky)" />
          <circle cx="68" cy="30" r="8" fill="var(--room-sun)" className="room-twinkle" />
          <path d="M11 78 Q35 62 55 74 T89 70 V93 H11Z" fill="var(--room-hill)" />
          <rect x="48" y="11" width="4" height="82" fill="#d9c9a3" />
          <rect x="11" y="50" width="78" height="4" fill="#d9c9a3" />
          <rect x="0" y="98" width="100" height="8" rx="2" fill="#a88a5c" />
        </svg>
      );
    case "lights":
      return (
        <svg viewBox="0 0 400 48" className="h-full w-full overflow-visible">
          <path d="M0 6 Q100 40 200 10 T400 8" stroke="#3a2e22" strokeWidth="1.5" fill="none" />
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 14 + i * 28;
            const t = x / 400;
            const y =
              t < 0.5
                ? 6 + Math.sin(t * 2 * Math.PI) * 18 + 8
                : 10 + Math.sin((t - 0.5) * 2 * Math.PI) * 12;
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
          <rect x="0" y="0" width="200" height="144" rx="4" fill="#4a2c1a" />
          <rect x="8" y="8" width="184" height="128" fill="#8a6440" />
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={i}
              cx={((i * 47) % 180) + 12}
              cy={((i * 31) % 120) + 12}
              r="1"
              fill="#6a4a2c"
            />
          ))}
          <g transform="rotate(-5 45 50)">
            <rect x="22" y="22" width="46" height="54" fill="#e8dcc0" />
            <rect x="27" y="27" width="36" height="34" fill="#5a6a5e" />
            <circle cx="45" cy="40" r="7" fill="#7b5a49" />
          </g>
          <circle cx="45" cy="22" r="3.5" fill="#8a2a2a" />
          <rect x="120" y="70" width="40" height="38" fill="#d6c08a" transform="rotate(4 140 89)" />
          <text
            x="140"
            y="92"
            fontSize="9"
            textAnchor="middle"
            fill="#3a2a14"
            fontFamily="Gaegu, cursive"
            transform="rotate(4 140 89)"
          >
            drink water ♡
          </text>
          <rect
            x="105"
            y="20"
            width="60"
            height="30"
            fill="#b89a7a"
            transform="rotate(-3 135 35)"
          />
          <circle cx="135" cy="20" r="3" fill="#b08a3a" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 80 100" className="h-full w-full">
          <rect x="2" y="8" width="76" height="90" rx="4" fill="#e8dcc0" stroke="#8a7458" />
          <rect x="2" y="8" width="76" height="24" rx="4" fill="#6e1f24" />
          {[14, 28, 42, 56, 70].map((x) => (
            <rect key={x} x={x - 2} y="2" width="4" height="12" rx="2" fill="#555" />
          ))}
          <text
            x="40"
            y="26"
            fontSize="11"
            textAnchor="middle"
            fill="#fff"
            fontWeight="700"
            letterSpacing="2"
          >
            {new Date().toLocaleString("en", { month: "short" }).toUpperCase()}
          </text>
          <text x="40" y="74" fontSize="38" textAnchor="middle" fill="#4a1a1c" fontWeight="800">
            {new Date().getDate()}
          </text>
          <text x="40" y="90" fontSize="8" textAnchor="middle" fill="#888" letterSpacing="2">
            {new Date().toLocaleString("en", { weekday: "long" }).toUpperCase()}
          </text>
        </svg>
      );
    case "clock": {
      const d = new Date();
      const h = ((d.getHours() % 12) + d.getMinutes() / 60) * 30;
      const m = d.getMinutes() * 6;
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="46" fill="#5a2a20" />
          <circle cx="50" cy="50" r="39" fill="#d8c7a0" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="49"
              y="15"
              width="2"
              height="6"
              fill="#5a2a20"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
          <rect
            x="48.5"
            y="28"
            width="3"
            height="23"
            rx="1.5"
            fill="#1e140c"
            transform={`rotate(${h} 50 50)`}
          />
          <rect
            x="49.2"
            y="19"
            width="1.6"
            height="32"
            rx="1"
            fill="#1e140c"
            transform={`rotate(${m} 50 50)`}
          />
          <rect
            x="49.6"
            y="17"
            width="0.8"
            height="36"
            fill="#6e1f24"
            className="room-second"
            style={{ transformOrigin: "50px 50px" }}
          />
          <circle cx="50" cy="50" r="3" fill="#6e1f24" />
        </svg>
      );
    }
    case "frame":
      return (
        <svg viewBox="0 0 80 96" className="h-full w-full">
          <rect width="80" height="96" rx="3" fill="var(--room-frame)" />
          <rect x="7" y="7" width="66" height="82" fill="var(--room-mat)" />
          {photo ? (
            <svg x="14" y="14" width="52" height="56" viewBox="0 0 52 56" overflow="hidden">
              <image href={photo} width="52" height="56" preserveAspectRatio="xMidYMid slice" />
            </svg>
          ) : (
            <>
              <rect x="14" y="14" width="52" height="56" fill="var(--room-sky)" />
              <circle cx="40" cy="44" r="12" fill="var(--room-sun)" />
              <path d="M14 62 Q30 52 40 60 T66 56 V70 H14Z" fill="var(--room-hill)" />
            </>
          )}
        </svg>
      );
    case "shelf":
      return (
        <svg viewBox="0 0 100 160" className="h-full w-full">
          <rect x="0" y="0" width="100" height="160" rx="3" fill="#4a2418" />
          <rect x="6" y="6" width="88" height="148" fill="#2a1610" />
          {[50, 100].map((y) => (
            <rect key={y} x="6" y={y} width="88" height="5" fill="#4a2418" />
          ))}
          {[
            [10, "#7a2e24", 34],
            [20, "#9a7a3a", 40],
            [29, "#2f5a3e", 30],
            [38, "#b8a07a", 38],
            [48, "#2a3a34", 42],
          ].map(([x, c, h], i) => (
            <rect
              key={i}
              x={x as number}
              y={50 - (h as number)}
              width="8"
              height={h as number}
              fill={c as string}
            />
          ))}
          <circle cx="76" cy="38" r="10" fill="#3f7a48" />
          <rect x="70" y="38" width="12" height="12" fill="#7a5a3a" />
          {[
            [12, "#9a7a3a", 36],
            [22, "#b8a07a", 40],
            [32, "#7a2e24", 34],
            [70, "#2f5a3e", 40],
            [80, "#2a3a34", 36],
          ].map(([x, c, h], i) => (
            <rect
              key={i}
              x={x as number}
              y={100 - (h as number)}
              width="9"
              height={h as number}
              fill={c as string}
            />
          ))}
          <rect x="44" y="84" width="18" height="16" rx="2" fill="#d9c9a3" />
          <rect x="14" y="128" width="30" height="26" rx="2" fill="#b8a07a" />
          <rect x="54" y="122" width="34" height="32" rx="2" fill="#8a6440" />
          <rect x="4" y="154" width="8" height="6" fill="#1e0e08" />
          <rect x="88" y="154" width="8" height="6" fill="#1e0e08" />
        </svg>
      );
    case "desk":
      return (
        <svg viewBox="0 0 200 100" className="h-full w-full">
          <rect x="0" y="0" width="200" height="10" rx="2" fill="#5a3a24" />
          <rect x="0" y="9" width="200" height="4" fill="#3e2618" />
          <rect x="6" y="13" width="64" height="87" fill="#4a2e1c" />
          {[22, 50, 78].map((y) => (
            <g key={y}>
              <rect x="10" y={y - 6} width="56" height="24" fill="#d9c9a3" />
              <rect x="28" y={y + 2} width="20" height="3" rx="1.5" fill="#b08a4a" />
            </g>
          ))}
          <rect x="186" y="13" width="8" height="87" fill="#3e2618" />
        </svg>
      );
    case "rug":
      return (
        <svg viewBox="0 0 200 36" className="h-full w-full">
          <path d="M20 0 H180 L200 36 H0Z" fill="var(--room-rug)" />
          <path
            d="M30 4 H170 L186 32 H14Z"
            fill="none"
            stroke="var(--room-rug-line)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        </svg>
      );
    case "monitor":
      return (
        <svg viewBox="0 0 100 85" className="h-full w-full">
          <rect x="0" y="0" width="100" height="62" rx="3" fill="#141812" />
          <rect x="4" y="4" width="92" height="54" fill="var(--room-screen)" />
          <rect x="10" y="12" width="36" height="4" rx="2" fill="#ffffff55" />
          <rect x="10" y="20" width="54" height="3" rx="1.5" fill="#ffffff33" />
          <rect x="10" y="26" width="44" height="3" rx="1.5" fill="#ffffff33" />
          <rect x="44" y="62" width="12" height="16" fill="#3a3a36" />
          <rect x="30" y="78" width="40" height="7" rx="2" fill="#2e2e2a" />
        </svg>
      );
    case "lamp":
      return (
        <svg viewBox="0 0 60 90" className="h-full w-full overflow-visible">
          <path d="M14 4 H46 L56 34 H4Z" fill="#b8893a" />
          <ellipse cx="30" cy="34" rx="26" ry="4" fill="var(--room-bulb)" />
          <rect x="28" y="34" width="4" height="46" fill="#8a6a30" />
          <ellipse cx="30" cy="84" rx="16" ry="5" fill="#8a6a30" />
        </svg>
      );
    case "mug":
      return (
        <svg viewBox="0 0 40 44" className="h-full w-full overflow-visible">
          <g className="room-steam">
            <path d="M14 2 q-4 5 0 9 t0 9" stroke="#ffffff99" strokeWidth="1.6" fill="none" />
            <path d="M22 0 q-4 5 0 9 t0 9" stroke="#ffffff77" strokeWidth="1.6" fill="none" />
          </g>
          <path d="M30 22 q10 0 10 7 t-10 7" stroke="#d9c9a3" strokeWidth="3.5" fill="none" />
          <rect x="4" y="18" width="28" height="24" rx="4" fill="#d9c9a3" />
          <ellipse cx="18" cy="19" rx="13" ry="3" fill="#2a1810" />
          <ellipse cx="18" cy="43" rx="17" ry="2" fill="#4a2c1a" />
        </svg>
      );
    case "inbox":
      return (
        <svg viewBox="0 0 100 38" className="h-full w-full">
          <path d="M8 0 H92 L100 10 V38 H0 V10Z" fill="#3e4a32" />
          <path d="M8 0 H92 L96 6 H4Z" fill="#55623f" />
          <rect x="30" y="18" width="40" height="11" fill="#d9c9a3" />
          <text
            x="50"
            y="27"
            fontSize="8"
            textAnchor="middle"
            fontWeight="800"
            letterSpacing="2"
            fill="#3e4a32"
          >
            INBOX
          </text>
        </svg>
      );
    case "books":
      return (
        <svg viewBox="0 0 60 42" className="h-full w-full">
          <rect x="4" y="30" width="52" height="12" rx="1" fill="#2a3a34" />
          <rect x="8" y="18" width="46" height="12" rx="1" fill="#9a7a3a" />
          <rect x="2" y="6" width="48" height="12" rx="1" fill="#7a2e24" />
          <rect x="2" y="10" width="48" height="2" fill="#d9c9a3" opacity=".5" />
        </svg>
      );
    case "plant":
      return (
        <svg viewBox="0 0 80 120" className="h-full w-full">
          <g className="room-sway" style={{ transformOrigin: "40px 80px" }}>
            {[
              [-40, 30],
              [-15, 20],
              [10, 16],
              [35, 26],
              [-60, 50],
              [58, 48],
              [0, 6],
            ].map(([r, y], i) => (
              <ellipse
                key={i}
                cx="40"
                cy={y}
                rx="9"
                ry="26"
                fill={i % 2 ? "#2f6a3a" : "#4a8a4a"}
                transform={`rotate(${r} 40 80)`}
              />
            ))}
          </g>
          <path d="M18 78 H62 L56 120 H24Z" fill="#6a3a24" />
          <rect x="14" y="74" width="52" height="8" rx="2" fill="#5a2e1c" />
        </svg>
      );
    case "monstera":
      return (
        <svg viewBox="0 0 100 140" className="h-full w-full">
          <g className="room-sway" style={{ transformOrigin: "50px 100px" }}>
            {[
              [-42, 46, 34],
              [-14, 30, 44],
              [16, 28, 46],
              [44, 48, 32],
              [0, 14, 40],
            ].map(([r, y, h], i) => (
              <g key={i} transform={`rotate(${r} 50 100)`}>
                <ellipse
                  cx="50"
                  cy={y as number}
                  rx="13"
                  ry={(h as number) / 2}
                  fill={i % 2 ? "#1f5a30" : "#3a7a44"}
                />
                <line
                  x1="50"
                  y1={(y as number) - (h as number) / 2}
                  x2="50"
                  y2="100"
                  stroke="#1a4024"
                  strokeWidth="1.6"
                />
                {[0.3, 0.55, 0.8].map((t, j) => (
                  <line
                    key={j}
                    x1="50"
                    y1={(y as number) - (h as number) / 2 + (h as number) * t}
                    x2={j % 2 ? 41 : 59}
                    y2={(y as number) - (h as number) / 2 + (h as number) * t + 4}
                    stroke="#1a4024"
                    strokeWidth="1"
                  />
                ))}
              </g>
            ))}
          </g>
          <path d="M32 100 H68 L62 140 H38Z" fill="#7a5a3a" />
          <rect x="28" y="96" width="44" height="7" rx="2" fill="#5a3e26" />
        </svg>
      );
    case "cactus":
      return (
        <svg viewBox="0 0 60 96" className="h-full w-full">
          <g className="room-sway" style={{ transformOrigin: "30px 70px" }}>
            <rect x="22" y="8" width="16" height="64" rx="8" fill="#3a7a44" />
            <rect x="6" y="26" width="10" height="26" rx="5" fill="#4a8a50" />
            <rect x="10" y="40" width="14" height="8" rx="4" fill="#4a8a50" />
            <rect x="44" y="20" width="10" height="30" rx="5" fill="#4a8a50" />
            <rect x="36" y="38" width="14" height="8" rx="4" fill="#4a8a50" />
            {[16, 30, 44, 58].map((y) => (
              <line key={y} x1="30" y1={y} x2="30" y2={y + 6} stroke="#1f5a30" strokeWidth="1.2" />
            ))}
            <circle cx="30" cy="6" r="4" fill="#e88aa0" />
          </g>
          <path d="M16 70 H44 L40 96 H20Z" fill="#7a2e24" />
          <rect x="13" y="66" width="34" height="7" rx="2" fill="#b05340" />
        </svg>
      );
    case "hangingplant":
      return (
        <svg viewBox="0 0 80 144" className="h-full w-full overflow-visible">
          <line x1="40" y1="0" x2="24" y2="34" stroke="#8a6a4a" strokeWidth="1.5" />
          <line x1="40" y1="0" x2="56" y2="34" stroke="#8a6a4a" strokeWidth="1.5" />
          <line x1="40" y1="0" x2="40" y2="30" stroke="#8a6a4a" strokeWidth="1.5" />
          <path d="M22 32 H58 L52 58 H28Z" fill="#d9a05e" />
          <path d="M22 32 H58 L56 42 H24Z" fill="#c28a4c" />
          <g className="room-sway" style={{ transformOrigin: "40px 58px" }}>
            {(
              [
                [14, 66],
                [26, 72],
                [40, 78],
                [54, 72],
                [66, 64],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <g key={i}>
                <path
                  d={`M${x} 58 Q${x + (i % 2 ? 6 : -6)} ${(y as number) + 14} ${x} ${(y as number) + 30}`}
                  stroke="#3a7a44"
                  strokeWidth="1.6"
                  fill="none"
                />
                {[0.25, 0.55, 0.85].map((t, j) => (
                  <ellipse
                    key={j}
                    cx={(x as number) + (i % 2 ? 3 : -3)}
                    cy={58 + ((y as number) + 30 - 58) * t}
                    rx="3.4"
                    ry="5"
                    fill={j % 2 ? "#4a8a50" : "#1f5a30"}
                    transform={`rotate(${i % 2 ? 24 : -24} ${x as number} ${58 + ((y as number) + 30 - 58) * t})`}
                  />
                ))}
              </g>
            ))}
            <ellipse cx="40" cy="52" rx="20" ry="9" fill="#4a8a50" />
          </g>
        </svg>
      );
    case "bookrow":
      return (
        <svg viewBox="0 0 100 90" className="h-full w-full">
          <rect x="0" y="84" width="100" height="6" rx="2" fill="#4a2418" />
          {[
            [4, "#7a2e24", 62, 9],
            [14, "#9a7a3a", 70, 8],
            [23, "#2f5a3e", 58, 10],
            [34, "#b8a07a", 66, 8],
            [43, "#2a3a34", 72, 9],
            [53, "#d9a05e", 60, 8],
            [62, "#4a2c1a", 68, 9],
          ].map(([x, c, h, w], i) => (
            <g key={i}>
              <rect
                x={x as number}
                y={84 - (h as number)}
                width={w as number}
                height={h as number}
                rx="1"
                fill={c as string}
              />
              <rect
                x={x as number}
                y={84 - (h as number) + 6}
                width={w as number}
                height="2"
                fill="#00000022"
              />
            </g>
          ))}
          <g transform="rotate(14 82 84)">
            <rect x="74" y="30" width="9" height="54" rx="1" fill="#b0538a" />
          </g>
          <rect x="86" y="48" width="10" height="36" rx="1" fill="#3f7a48" />
        </svg>
      );
    case "openbook":
      return (
        <svg viewBox="0 0 100 60" className="h-full w-full">
          <path d="M4 12 Q27 2 50 12 Q73 2 96 12 V52 Q73 42 50 52 Q27 42 4 52Z" fill="#4a2c1a" />
          <path d="M8 13 Q29 5 50 14 V50 Q29 41 8 50Z" fill="#d8c7a0" />
          <path d="M92 13 Q71 5 50 14 V50 Q71 41 92 50Z" fill="#d9c9a3" />
          <line x1="50" y1="14" x2="50" y2="50" stroke="#5a3e26" strokeWidth="1.5" />
          {[20, 27, 34, 41].map((y) => (
            <g key={y}>
              <line x1="14" y1={y} x2="44" y2={y - 2} stroke="#b9ac96" strokeWidth="1.4" />
              <line x1="56" y1={y - 2} x2="86" y2={y} stroke="#b9ac96" strokeWidth="1.4" />
            </g>
          ))}
        </svg>
      );
    case "cat":
      return (
        <svg viewBox="0 0 100 55" className="h-full w-full overflow-visible">
          <ellipse cx="50" cy="50" rx="48" ry="5" fill="#00000022" />
          <g className="room-breathe" style={{ transformOrigin: "50px 50px" }}>
            <path
              d="M88 44 Q100 30 86 24"
              stroke="#e39b5a"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="52" cy="36" rx="38" ry="16" fill="#e39b5a" />
            <path
              d="M36 26 q8 -4 14 0 M54 24 q8 -4 14 0"
              stroke="#c97b3c"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="20" cy="38" r="15" fill="#eda866" />
            <path d="M8 30 L10 16 L20 26Z M24 25 L32 14 L34 30Z" fill="#eda866" />
            <path
              d="M12 39 q3 2 6 0 M23 39 q3 2 6 0"
              stroke="#5a3a22"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="20" cy="45" rx="5" ry="2.5" fill="#f7d3b0" />
          </g>
          <text
            x="10"
            y="8"
            fontSize="10"
            fill="var(--room-ink)"
            className="room-zzz"
            fontFamily="Gaegu, cursive"
          >
            z z
          </text>
        </svg>
      );
    case "trash":
      return (
        <svg viewBox="0 0 60 72" className="h-full w-full">
          <ellipse cx="30" cy="8" rx="28" ry="7" fill="#5f6875" />
          <ellipse cx="30" cy="8" rx="24" ry="5" fill="#2f343b" />
          <path d="M2 8 L8 70 H52 L58 8 Q30 16 2 8Z" fill="#8a94a1" />
          {[14, 22, 30, 38, 46].map((x) => (
            <line
              key={x}
              x1={x}
              y1="16"
              x2={x + (x - 30) * 0.08}
              y2="66"
              stroke="#78818d"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      );
  }
}
