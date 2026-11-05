import type { ItemType } from "@/lib/room";
import { GothicWindow } from "./GothicWindow";
import { FairyLights } from "./FairyLights";
import { isFairyLight, type LightColor } from "@/lib/fairy-lights";

// Illustrated artwork for each room item. Colors here are part of the illustration itself.
export function ItemArt({ type, photo, lightColor }: { type: ItemType; photo?: string | undefined; lightColor?: LightColor | undefined }) {
  if (isFairyLight(type)) return <FairyLights type={type} color={lightColor} />;
  switch (type) {
    case "window":
      return <GothicWindow />;
    case "corkboard":
      return (
        <svg viewBox="0 0 200 144" className="h-full w-full overflow-visible">
          {/* soft wall shadow */}
          <rect x="5" y="7" width="200" height="144" rx="6" fill="#000" opacity="0.3" />
          {/* bevelled walnut frame */}
          <rect x="0" y="0" width="200" height="144" rx="4" fill="#24140b" />
          <rect x="1.5" y="1.5" width="197" height="141" rx="3" fill="#4a2c1a" />
          <rect x="1.5" y="1.5" width="197" height="3" rx="1.5" fill="#6e4a2c" opacity="0.7" />
          {/* gilded inner lip */}
          <rect x="7" y="7" width="186" height="130" fill="#b08a4a" />
          <rect x="8.6" y="8.6" width="182.8" height="126.8" fill="#7a5a2e" />
          {/* aged cork */}
          <rect x="12" y="12" width="176" height="120" fill="#6e4c2e" />
          <rect x="12" y="12" width="176" height="120" fill="#7a5636" opacity="0.6" />
          {Array.from({ length: 48 }).map((_, i) => (
            <circle
              key={i}
              cx={((i * 47) % 168) + 16}
              cy={((i * 31) % 112) + 16}
              r="1"
              fill="#4e3418"
              opacity="0.55"
            />
          ))}
          {/* botanical sketch on parchment */}
          <g transform="rotate(-5 48 52)">
            <rect x="24" y="24" width="48" height="58" fill="#e2d3ae" />
            <rect x="24" y="24" width="48" height="58" fill="none" stroke="#b89a6a" strokeWidth="1" />
            <path d="M48 74 V40" stroke="#3f5a3a" strokeWidth="1.4" fill="none" />
            {[46, 52, 58, 64].map((y, i) => (
              <g key={y}>
                <path d={`M48 ${y} q ${-10 - i} -3 ${-14 - i} -8`} stroke="#3f5a3a" strokeWidth="1" fill="none" />
                <path d={`M48 ${y} q ${10 + i} -3 ${14 + i} -8`} stroke="#3f5a3a" strokeWidth="1" fill="none" />
              </g>
            ))}
            <text x="48" y="80" fontSize="5" textAnchor="middle" fill="#6a5636" fontFamily="Gaegu, cursive" letterSpacing="0.5">
              filix mas
            </text>
          </g>
          <circle cx="48" cy="23" r="3" fill="#b08a4a" />
          <circle cx="47" cy="22" r="1" fill="#e8cc8a" />
          {/* sepia photograph */}
          <g transform="rotate(4 140 46)">
            <rect x="118" y="26" width="44" height="40" fill="#e8dcc0" />
            <rect x="122" y="30" width="36" height="28" fill="#5a4632" />
            <circle cx="140" cy="42" r="6" fill="#8a6a4a" />
            <path d="M122 52 Q132 44 140 50 T158 48 V58 H122Z" fill="#3e2f1e" />
          </g>
          <circle cx="140" cy="26" r="3" fill="#b08a4a" />
          <circle cx="139" cy="25" r="1" fill="#e8cc8a" />
          {/* parchment note with wax seal */}
          <g transform="rotate(3 135 98)">
            <rect x="112" y="80" width="46" height="34" fill="#d6c08a" />
            <text x="135" y="98" fontSize="9" textAnchor="middle" fill="#3a2a14" fontFamily="Gaegu, cursive">
              drink water ♡
            </text>
            <circle cx="150" cy="108" r="4.5" fill="#6e1f24" />
            <circle cx="150" cy="108" r="2" fill="#8a2a2a" />
          </g>
          <circle cx="135" cy="80" r="3" fill="#b08a4a" />
          <circle cx="134" cy="79" r="1" fill="#e8cc8a" />
          {/* twine with an old brass key */}
          <path d="M20 118 Q60 128 100 120" stroke="#b89a6a" strokeWidth="1.2" fill="none" />
          <g transform="rotate(-12 34 122)">
            <circle cx="30" cy="120" r="3.4" fill="none" stroke="#b08a4a" strokeWidth="1.6" />
            <rect x="32.6" y="119.2" width="12" height="1.8" fill="#b08a4a" />
            <rect x="40" y="120.8" width="1.8" height="3.4" fill="#b08a4a" />
            <rect x="43" y="120.8" width="1.8" height="2.6" fill="#b08a4a" />
          </g>
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
        <svg viewBox="0 0 80 96" className="h-full w-full overflow-visible">
          {/* soft shadow */}
          <rect x="3" y="5" width="80" height="96" rx="4" fill="#000" opacity="0.3" />
          {/* gilded baroque frame */}
          <rect width="80" height="96" rx="3" fill="#6e5222" />
          <rect x="1.5" y="1.5" width="77" height="93" rx="2.5" fill="#b08a4a" />
          <rect x="1.5" y="1.5" width="77" height="2.5" fill="#e8cc8a" opacity="0.7" />
          {/* corner rosettes */}
          {[
            [3.5, 3.5],
            [76.5, 3.5],
            [3.5, 92.5],
            [76.5, 92.5],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="2.6" fill="#8a6a2e" />
              <circle cx={cx} cy={cy} r="1.3" fill="#e8cc8a" />
            </g>
          ))}
          {/* dark velvet matting */}
          <rect x="7" y="7" width="66" height="82" fill="#241a12" />
          <rect x="9" y="9" width="62" height="78" fill="#31241a" />
          <rect x="12" y="12" width="56" height="72" fill="none" stroke="#b08a4a" strokeWidth="0.8" opacity="0.6" />
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
          {/* glass sheen */}
          <path d="M14 14 L34 14 L20 70 L14 70Z" fill="#fff" opacity="0.06" />
        </svg>
      );
    case "shelf":
      return (
        <svg viewBox="0 0 100 160" className="h-full w-full overflow-visible">
          {/* contact shadow */}
          <ellipse cx="50" cy="160" rx="52" ry="3" fill="#000" opacity="0.35" />
          {/* 2.5D crown top plane */}
          <path d="M4 0 H96 L100 6 H0Z" fill="#4a2c1a" />
          <path d="M6 0.8 H94 L97 4.5 H3Z" fill="#5e3a22" opacity="0.6" />
          {/* crown moulding */}
          <rect x="0" y="6" width="100" height="4" fill="#3a2214" />
          <rect x="0" y="6" width="100" height="0.8" fill="#6e4a2c" opacity="0.6" />
          <rect x="0" y="9.4" width="100" height="1" fill="#24140b" />
          {/* carcass */}
          <rect x="2" y="10" width="96" height="144" fill="#2e1a10" />
          {/* recessed interior */}
          <rect x="8" y="14" width="84" height="134" fill="#1e0e08" />
          <rect x="8" y="14" width="84" height="2" fill="#000" opacity="0.5" />
          {/* pilasters */}
          <rect x="2" y="10" width="6" height="144" fill="#3a2214" />
          <rect x="92" y="10" width="6" height="144" fill="#3a2214" />
          <rect x="3" y="10" width="1.2" height="144" fill="#6e4a2c" opacity="0.5" />
          <rect x="95.8" y="10" width="1.2" height="144" fill="#1e0e08" opacity="0.7" />
          {/* shelf boards with shadow lines */}
          {[58, 102].map((y) => (
            <g key={y}>
              <rect x="8" y={y} width="84" height="4" fill="#3a2214" />
              <rect x="8" y={y} width="84" height="0.8" fill="#6e4a2c" opacity="0.5" />
              <rect x="8" y={y + 4} width="84" height="1.4" fill="#000" opacity="0.45" />
            </g>
          ))}
          {/* top shelf: leather-bound tomes with ribbed spines + brass bands */}
          {[
            [11, "#5e1f16", 36],
            [19, "#23402f", 40],
            [27, "#7a2e24", 33],
            [35, "#3a2c4a", 38],
            [43, "#23402f", 35],
          ].map(([x, c, h], i) => (
            <g key={i}>
              <rect x={x as number} y={58 - (h as number)} width="7" height={h as number} fill={c as string} />
              <rect x={x as number} y={58 - (h as number)} width="1.4" height={h as number} fill="#000" opacity="0.3" />
              {[0.3, 0.55, 0.8].map((f) => (
                <rect key={f} x={x as number} y={58 - (h as number) + (h as number) * f} width="7" height="0.9" fill="#b08a4a" opacity="0.85" />
              ))}
            </g>
          ))}
          {/* leaning book */}
          <g transform="rotate(14 56 58)">
            <rect x="52" y="26" width="7" height="32" fill="#7a2e24" />
            <rect x="52" y="34" width="7" height="0.9" fill="#b08a4a" opacity="0.85" />
          </g>
          {/* small brass globe */}
          <circle cx="76" cy="46" r="9" fill="#8a6a30" />
          <ellipse cx="76" cy="46" rx="9" ry="3.4" fill="none" stroke="#c9a05a" strokeWidth="0.8" opacity="0.8" />
          <ellipse cx="76" cy="46" rx="3.4" ry="9" fill="none" stroke="#c9a05a" strokeWidth="0.8" opacity="0.8" />
          <circle cx="73" cy="43" r="2.4" fill="#c9a05a" opacity="0.5" />
          <path d="M67 54 Q76 58 85 54" fill="none" stroke="#c9a05a" strokeWidth="1.2" />
          <rect x="74.5" y="55" width="3" height="3" fill="#8a6a30" />
          {/* middle shelf: book row + horizontal stack + framed print */}
          {[
            [11, "#3a2c4a", 34],
            [19, "#7a2e24", 38],
            [27, "#23402f", 32],
            [35, "#5e1f16", 36],
          ].map(([x, c, h], i) => (
            <g key={i}>
              <rect x={x as number} y={102 - (h as number)} width="7" height={h as number} fill={c as string} />
              {[0.3, 0.6, 0.85].map((f) => (
                <rect key={f} x={x as number} y={102 - (h as number) + (h as number) * f} width="7" height="0.9" fill="#b08a4a" opacity="0.85" />
              ))}
            </g>
          ))}
          {/* horizontal stack */}
          <rect x="48" y="96" width="20" height="6" rx="0.8" fill="#23402f" />
          <rect x="50" y="90" width="17" height="6" rx="0.8" fill="#7a2e24" />
          <rect x="49" y="84" width="18" height="6" rx="0.8" fill="#3a2c4a" />
          <rect x="49" y="86.5" width="18" height="1" fill="#d9c9a3" opacity="0.4" />
          {/* small framed print */}
          <rect x="74" y="78" width="14" height="20" fill="#b08a4a" />
          <rect x="75.5" y="79.5" width="11" height="17" fill="#1e0e08" />
          <path d="M77 94 Q80 86 82 90 T86 88 V96 H77Z" fill="#23402f" opacity="0.8" />
          <circle cx="80" cy="84" r="1.6" fill="#c9a05a" opacity="0.7" />
          {/* bottom shelf: archive boxes + bookend row */}
          <rect x="11" y="126" width="26" height="22" rx="1" fill="#3d2415" stroke="#1e0e08" strokeWidth="0.8" />
          <rect x="14" y="129" width="20" height="16" rx="0.6" fill="none" stroke="#5a3820" strokeWidth="0.6" />
          <rect x="19" y="134" width="10" height="5" rx="0.6" fill="#d9c9a3" />
          <rect x="42" y="122" width="26" height="26" rx="1" fill="#3d2415" stroke="#1e0e08" strokeWidth="0.8" />
          <rect x="45" y="125" width="20" height="20" rx="0.6" fill="none" stroke="#5a3820" strokeWidth="0.6" />
          <rect x="50" y="132" width="10" height="5" rx="0.6" fill="#d9c9a3" />
          {[
            [72, "#5e1f16", 24],
            [79, "#23402f", 26],
          ].map(([x, c, h], i) => (
            <g key={i}>
              <rect x={x as number} y={148 - (h as number)} width="6" height={h as number} fill={c as string} />
              <rect x={x as number} y={148 - (h as number) + (h as number) * 0.5} width="6" height="0.8" fill="#b08a4a" opacity="0.85" />
            </g>
          ))}
          {/* plinth base + bracket feet */}
          <rect x="2" y="148" width="96" height="4" fill="#24140b" />
          <rect x="0" y="152" width="100" height="3" fill="#3a2214" />
          <path d="M4 155 H14 L12 160 H6Z" fill="#24140b" />
          <path d="M86 155 H96 L94 160 H88Z" fill="#24140b" />
        </svg>
      );
    case "desk":
      return (
        <svg viewBox="0 0 200 100" className="h-full w-full overflow-visible">
          {/* contact shadow */}
          <ellipse cx="100" cy="100" rx="98" ry="3" fill="#000" opacity="0.35" />
          {/* 2.5D top plane */}
          <path d="M8 0 H192 L200 7 H0Z" fill="#4a2c1a" />
          <path d="M8 0 H192 L196 3.5 H4Z" fill="#5e3a22" opacity="0.6" />
          {/* leather blotter */}
          <path d="M70 1.2 H150 L154 5.6 H66Z" fill="#23402f" />
          <path d="M72 1.8 H148 L151 5 H69Z" fill="none" stroke="#b08a4a" strokeWidth="0.4" opacity="0.7" />
          {/* front edge with moulding */}
          <rect x="0" y="7" width="200" height="6" fill="#3a2214" />
          <rect x="0" y="12" width="200" height="1.2" fill="#24140b" />
          <rect x="0" y="7" width="200" height="0.8" fill="#6e4a2c" opacity="0.6" />
          {/* apron with centre drawer */}
          <rect x="72" y="13" width="112" height="12" fill="#2e1a10" />
          <rect x="76" y="15" width="104" height="8" rx="0.8" fill="#3d2415" stroke="#1e0e08" strokeWidth="0.6" />
          <circle cx="128" cy="19" r="1.6" fill="#c9a05a" />
          <circle cx="128" cy="19" r="0.7" fill="#7a5a2a" />
          {/* pedestal */}
          <rect x="6" y="13" width="64" height="83" fill="#2e1a10" />
          <rect x="66" y="13" width="4" height="83" fill="#1e0e08" opacity="0.7" />
          {[16, 43, 70].map((y) => (
            <g key={y}>
              <rect x="10" y={y} width="54" height="24" rx="1" fill="#3d2415" stroke="#1e0e08" strokeWidth="0.8" />
              <rect x="13" y={y + 3} width="48" height="18" rx="0.6" fill="none" stroke="#5a3820" strokeWidth="0.6" />
              <path d={`M30 ${y + 10} q7 5 14 0`} fill="none" stroke="#c9a05a" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="30" cy={y + 10} r="1.2" fill="#a07c3e" />
              <circle cx="44" cy={y + 10} r="1.2" fill="#a07c3e" />
            </g>
          ))}
          {/* plinth */}
          <rect x="4" y="94" width="68" height="4" fill="#24140b" />
          {/* turned leg */}
          <rect x="182" y="13" width="10" height="4" fill="#3a2214" />
          <path d="M184 17 H190 L189 40 Q192 44 189 48 L188 92 H186 L185 48 Q182 44 185 40Z" fill="#3a2214" />
          <rect x="183.5" y="92" width="7" height="6" rx="1" fill="#b08a4a" />
          <rect x="186" y="17" width="1" height="75" fill="#6e4a2c" opacity="0.4" />
        </svg>
      );
    case "rug":
      return (
        <svg viewBox="0 0 200 36" className="h-full w-full overflow-visible">
          {/* fringe tassels */}
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <line x1={2 + i * 2.2} y1="34.5" x2={1.4 + i * 2.2} y2="36" stroke="#d9c9a3" strokeWidth="0.7" opacity="0.8" />
              <line x1={198 - i * 2.2} y1="34.5" x2={198.6 - i * 2.2} y2="36" stroke="#d9c9a3" strokeWidth="0.7" opacity="0.8" />
            </g>
          ))}
          {/* field */}
          <path d="M20 0 H180 L200 36 H0Z" fill="var(--room-rug)" />
          {/* outer border band */}
          <path d="M24 2.5 H176 L194 33.5 H6Z" fill="none" stroke="var(--room-rug-line)" strokeWidth="3" />
          {/* brass pinstripe */}
          <path d="M27 4.5 H173 L189 31.5 H11Z" fill="none" stroke="#b08a4a" strokeWidth="0.7" opacity="0.85" />
          {/* inner guard band */}
          <path d="M31 7 H169 L183 29 H17Z" fill="none" stroke="var(--room-rug-line)" strokeWidth="1.2" strokeDasharray="3 2.4" opacity="0.9" />
          {/* centre medallion */}
          <path d="M100 8 L126 18 L100 28 L74 18Z" fill="none" stroke="#b08a4a" strokeWidth="1" opacity="0.9" />
          <path d="M100 11.5 L117 18 L100 24.5 L83 18Z" fill="var(--room-rug-line)" opacity="0.55" />
          <path d="M100 14.5 L109 18 L100 21.5 L91 18Z" fill="#b08a4a" opacity="0.8" />
          <circle cx="100" cy="18" r="1.1" fill="#d9c9a3" />
          {/* side medallions */}
          {[52, 148].map((cx) => (
            <g key={cx}>
              <path d={`M${cx} 12 L${cx + 9} 18 L${cx} 24 L${cx - 9} 18Z`} fill="none" stroke="#b08a4a" strokeWidth="0.8" opacity="0.75" />
              <circle cx={cx} cy="18" r="1.6" fill="#b08a4a" opacity="0.7" />
            </g>
          ))}
          {/* corner motifs */}
          {[
            "M33 10 L40 13 L35 17",
            "M167 10 L160 13 L165 17",
            "M22 26 L30 24 L27 29",
            "M178 26 L170 24 L173 29",
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#b08a4a" strokeWidth="0.7" opacity="0.6" />
          ))}
        </svg>
      );
    case "monitor":
      return (
        <svg viewBox="0 0 100 85" className="h-full w-full overflow-visible">
          <ellipse cx="50" cy="85" rx="28" ry="2.5" fill="#000" opacity=".35" />
          <rect x="0" y="0" width="100" height="62" rx="3" fill="#2a170d" />
          <rect x="0.8" y="0.8" width="98.4" height="60.4" rx="2.6" fill="none" stroke="#5a3820" strokeWidth="1" />
          <rect x="2.6" y="2.6" width="94.8" height="56.8" rx="1.2" fill="none" stroke="#c9a24a" strokeWidth="0.8" />
          <rect x="4" y="4" width="92" height="54" fill="var(--room-screen)" />
          <rect x="4" y="4" width="92" height="54" fill="none" stroke="#0a0604" strokeWidth="0.6" />
          <rect x="10" y="12" width="36" height="4" rx="2" fill="#e8cf9a44" />
          <rect x="10" y="20" width="54" height="3" rx="1.5" fill="#e8cf9a2a" />
          <rect x="10" y="26" width="44" height="3" rx="1.5" fill="#e8cf9a2a" />
          {[[1.5, 1.5], [98.5, 1.5], [1.5, 60.5], [98.5, 60.5]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill="#c9a24a" stroke="#7a5a24" strokeWidth="0.4" />
          ))}
          <rect x="44" y="58.6" width="12" height="2.2" rx="1" fill="#c9a24a" />
          <circle cx="92" cy="60" r="0.9" fill="#e9b65a" />
          <path d="M45 62 H55 L53.5 66 Q56 68 53.5 70 L54 77 H46 L46.5 70 Q44 68 46.5 66Z" fill="#4a2c18" />
          <rect x="45.5" y="65.6" width="9" height="1.2" fill="#c9a24a" />
          <rect x="45.5" y="72" width="9" height="1" fill="#c9a24a" />
          <path d="M30 79 Q30 77 33 77 H67 Q70 77 70 79 V83 H30Z" fill="#3a2214" />
          <rect x="30" y="83" width="40" height="2" rx="1" fill="#1e110a" />
          <rect x="32" y="78.2" width="36" height="0.8" fill="#c9a24a" opacity=".8" />
        </svg>
      );
    case "lamp":
      return (
        <svg viewBox="0 0 60 90" className="h-full w-full overflow-visible">
          <ellipse cx="30" cy="89" rx="20" ry="2" fill="#000" opacity=".35" />
          <path d="M6 30 Q6 12 30 10 Q54 12 54 30 Z" fill="#1f4a34" />
          <path d="M10 26 Q12 15 30 13 Q22 17 18 27Z" fill="#4f8a62" opacity=".55" />
          <path d="M5 30 H55 Q55 33 52 33 H8 Q5 33 5 30Z" fill="#c9a24a" />
          <ellipse cx="30" cy="33" rx="22" ry="2.6" fill="var(--room-bulb)" opacity=".9" />
          <rect x="29" y="5" width="2" height="6" fill="#c9a24a" />
          <circle cx="30" cy="5" r="2" fill="#e0bd66" />
          <path d="M42 33 V44" stroke="#c9a24a" strokeWidth="0.6" />
          <circle cx="42" cy="45" r="1.2" fill="#e0bd66" />
          <rect x="28" y="33" width="4" height="40" fill="#a8822f" />
          <rect x="28.8" y="33" width="1" height="40" fill="#e9c878" opacity=".6" />
          <ellipse cx="30" cy="48" rx="3.6" ry="1.6" fill="#c9a24a" />
          <ellipse cx="30" cy="62" rx="3.6" ry="1.6" fill="#c9a24a" />
          <path d="M14 82 Q14 74 30 73 Q46 74 46 82Z" fill="#a8822f" />
          <path d="M18 80 Q20 76 30 75" stroke="#f0d48a" strokeWidth="0.8" fill="none" opacity=".7" />
          <rect x="11" y="82" width="38" height="5" rx="1.5" fill="#7a5a24" />
          <rect x="11" y="82" width="38" height="1" fill="#e0bd66" />
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
        <svg viewBox="0 0 80 120" className="h-full w-full overflow-visible">
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
        <svg viewBox="0 0 100 140" className="h-full w-full overflow-visible">
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
    case "candles":
      return (
        <svg viewBox="0 0 80 88" className="h-full w-full overflow-visible">
          <ellipse cx="40" cy="84" rx="36" ry="4" fill="#6b5a2e" />
          {[
            [18, 40, 9],
            [40, 26, 10],
            [61, 48, 8],
          ].map(([x, top, w], i) => (
            <g key={i}>
              <circle cx={x} cy={top! - 9} r="10" fill="#ffc46b" opacity="0.25" className="room-flicker" />
              <rect x={x! - w!} y={top} width={w! * 2} height={82 - top!} rx="2" fill="#e8dcc0" />
              <path d={`M${x! - w!} ${top! + 3} q4 4 3 9`} stroke="#d6c7a4" strokeWidth="2" fill="none" />
              <line x1={x} y1={top} x2={x} y2={top! - 4} stroke="#2a1c12" strokeWidth="1" />
              <path
                d={`M${x} ${top! - 14} q4 6 0 10 q-4 -4 0 -10z`}
                fill="#ffb347"
                className="room-flicker"
                style={{ transformOrigin: `${x}px ${top! - 4}px` }}
              />
              <path d={`M${x} ${top! - 10} q1.6 3 0 5 q-1.6 -2 0 -5z`} fill="#fff1c4" />
            </g>
          ))}
        </svg>
      );
    case "lantern":
      return (
        <svg viewBox="0 0 50 85" className="h-full w-full overflow-visible">
          <circle cx="25" cy="48" r="26" fill="#ffc46b" opacity="0.18" className="room-flicker" />
          <path d="M18 8 Q25 0 32 8" stroke="#b8893a" strokeWidth="2" fill="none" />
          <path d="M10 20 L25 9 L40 20Z" fill="#8a6428" />
          <rect x="12" y="20" width="26" height="52" fill="#ffd98a" opacity="0.55" />
          <rect x="12" y="20" width="26" height="52" fill="none" stroke="#8a6428" strokeWidth="2.5" />
          <line x1="25" y1="20" x2="25" y2="72" stroke="#8a6428" strokeWidth="1.5" />
          <rect x="21" y="48" width="8" height="18" rx="1" fill="#efe3c6" />
          <path d="M25 37 q4 5 0 10 q-4 -5 0 -10z" fill="#ffb347" className="room-flicker" style={{ transformOrigin: "25px 47px" }} />
          <rect x="8" y="72" width="34" height="7" rx="1" fill="#6b4a1e" />
        </svg>
      );
    case "glowjar":
      return (
        <svg viewBox="0 0 50 70" className="h-full w-full overflow-visible">
          <circle cx="25" cy="42" r="26" fill="#ffd27a" opacity="0.2" className="room-bulb" />
          <rect x="14" y="4" width="22" height="8" rx="2" fill="#8a6428" />
          <path d="M12 14 Q10 12 14 12 H36 Q40 12 38 14 Q44 22 44 40 V60 Q44 68 36 68 H14 Q6 68 6 60 V40 Q6 22 12 14Z" fill="#cfe3d6" opacity="0.35" stroke="#a8c3b2" strokeWidth="1.2" />
          {[
            [16, 30], [30, 26], [24, 40], [36, 46], [14, 52], [28, 58], [20, 22], [34, 36],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill="#fff0a8" className="room-bulb" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
          <path d="M14 16 Q24 30 18 44 Q12 56 30 62" stroke="#c9a66b" strokeWidth="0.6" fill="none" />
        </svg>
      );
    case "pothos":
      return (
        <svg viewBox="0 0 80 128" className="h-full w-full overflow-visible">
          <path d="M18 26 H62 L58 50 H22Z" fill="#7a4a2a" />
          <rect x="15" y="22" width="50" height="6" rx="2" fill="#8f5a34" />
          {[
            [24, 50, 108, -1], [36, 50, 124, 0], [50, 50, 116, 1], [60, 44, 96, 1], [18, 40, 90, -1],
          ].map(([x, y0, y1, d], i) => (
            <g key={i} className="room-sway" style={{ transformOrigin: `${x}px ${y0}px`, animationDelay: `${i * 0.5}s` }}>
              <path d={`M${x} ${y0} Q${x! + d! * 8} ${(y0! + y1!) / 2} ${x! + d! * 3} ${y1}`} stroke="#3e5c2a" strokeWidth="1.2" fill="none" />
              {Array.from({ length: 6 }, (_, j) => {
                const ty = y0! + ((y1! - y0!) * (j + 1)) / 7;
                const tx = x! + d! * 6 * Math.sin((j / 6) * Math.PI) + (j % 2 ? 4 : -4);
                return <path key={j} d={`M${tx} ${ty} q5 -6 9 0 q-4 6 -9 0z`} fill={j % 2 ? "#4f8a3a" : "#6aa84a"} transform={`rotate(${j % 2 ? 20 : 160} ${tx} ${ty})`} />;
              })}
            </g>
          ))}
          {[[22, 20], [32, 12], [44, 10], [56, 16], [62, 24], [28, 24], [50, 22]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} q7 -8 12 0 q-6 8 -12 0z`} fill={i % 2 ? "#4f8a3a" : "#6aa84a"} transform={`rotate(${i * 25 - 60} ${x} ${y})`} />
          ))}
        </svg>
      );
    case "fern":
      return (
        <svg viewBox="0 0 100 110" className="h-full w-full overflow-visible">
          {[-70, -45, -20, 0, 20, 45, 70].map((a, i) => (
            <g key={i} transform={`rotate(${a} 50 70)`} className="room-sway" style={{ transformOrigin: "50px 70px", animationDelay: `${i * 0.4}s` }}>
              <path d="M50 70 Q48 40 50 8" stroke="#2f5a2a" strokeWidth="1.4" fill="none" />
              {Array.from({ length: 10 }, (_, j) => {
                const y = 66 - j * 6;
                const l = 10 - j * 0.8;
                return (
                  <g key={j}>
                    <path d={`M50 ${y} q${-l / 2} -4 ${-l} -1`} stroke={j % 2 ? "#4f8a3a" : "#5f9a44"} strokeWidth="2.4" fill="none" strokeLinecap="round" />
                    <path d={`M50 ${y} q${l / 2} -4 ${l} -1`} stroke={j % 2 ? "#5f9a44" : "#4f8a3a"} strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  </g>
                );
              })}
            </g>
          ))}
          <path d="M30 72 H70 L65 106 H35Z" fill="#5a3a24" />
          <rect x="27" y="68" width="46" height="7" rx="2" fill="#6a4428" />
        </svg>
      );
    case "snakeplant":
      return (
        <svg viewBox="0 0 60 114" className="h-full w-full overflow-visible">
          {[
            [18, 20, -8], [26, 4, -2], [34, 10, 4], [42, 26, 10], [30, 30, 0],
          ].map(([x, top, lean], i) => (
            <g key={i}>
              <path d={`M${x! - 4} 80 Q${x! + lean! / 2 - 5} ${(80 + top!) / 2} ${x! + lean!} ${top} Q${x! + lean! / 2 + 6} ${(80 + top!) / 2} ${x! + 4} 80Z`} fill={i % 2 ? "#3d6b3a" : "#2f5a32"} />
              <path d={`M${x} 78 Q${x! + lean! / 2} ${(80 + top!) / 2} ${x! + lean!} ${top! + 6}`} stroke="#b8c76a" strokeWidth="0.8" fill="none" opacity="0.6" />
            </g>
          ))}
          <path d="M12 78 H48 L44 110 H16Z" fill="#2a2a2a" />
          <rect x="10" y="76" width="40" height="5" rx="2" fill="#3a3a3a" />
        </svg>
      );
    case "ivy":
      return (
        <svg viewBox="0 0 140 182" className="h-full w-full overflow-visible">
          {[
            "M10 0 Q30 60 18 120 Q10 160 26 180",
            "M50 0 Q60 50 44 90 Q34 130 52 150",
            "M95 0 Q80 40 96 80 Q110 120 90 170",
            "M130 0 Q120 30 128 70 Q134 100 118 120",
          ].map((d, i) => (
            <g key={i} className="room-sway" style={{ transformOrigin: "70px 0px", animationDelay: `${i * 0.7}s` }}>
              <path d={d} stroke="#3a4f2a" strokeWidth="1.4" fill="none" />
            </g>
          ))}
          {Array.from({ length: 46 }, (_, i) => {
            const col = i % 4;
            const xs = [14, 48, 92, 126];
            const y = (Math.floor(i / 4) * 15 + col * 5) % 175;
            const x = xs[col]! + Math.sin(y / 18 + col) * 10;
            return (
              <path key={i} d={`M${x} ${y} l5 -5 l4 4 l5 -2 l-3 6 l3 5 l-7 0 l-3 4 l-2 -5 l-5 -2z`} fill={i % 3 === 0 ? "#2f5a2a" : i % 3 === 1 ? "#4f8a3a" : "#3e6b34"} transform={`rotate(${(i * 47) % 360} ${x + 5} ${y})`} />
            );
          })}
        </svg>
      );
    case "speaker":
      return (
        <svg viewBox="0 0 70 100" className="h-full w-full">
          <rect x="2" y="2" width="66" height="96" rx="6" fill="#5a3a24" />
          <rect x="6" y="6" width="58" height="88" rx="4" fill="#6a4428" />
          <rect
            x="6"
            y="6"
            width="58"
            height="88"
            rx="4"
            fill="none"
            stroke="#3a2418"
            strokeWidth="1"
          />
          <circle cx="35" cy="30" r="15" fill="#1e140c" />
          <circle cx="35" cy="30" r="11" fill="#2a1c12" />
          <circle cx="35" cy="30" r="6" fill="#8a6440" />
          <circle cx="35" cy="30" r="2.5" fill="#3a2418" />
          <circle cx="35" cy="70" r="9" fill="#1e140c" />
          <circle cx="35" cy="70" r="6" fill="#2a1c12" />
          <circle cx="35" cy="70" r="1.6" fill="#8a6440" />
          <rect x="26" y="88" width="18" height="4" rx="2" fill="#b8893a" />
          <circle cx="32" cy="90" r="1" fill="#3a2418" />
          <circle cx="38" cy="90" r="1" fill="#3a2418" />
          <g className="room-pulse" style={{ transformOrigin: "35px 70px" }}>
            <circle
              cx="35"
              cy="70"
              r="9.5"
              fill="none"
              stroke="#b8893a"
              strokeWidth="0.6"
              opacity="0.5"
            />
          </g>
        </svg>
      );
  }
}
