import { lightColorAt, type FairyLightType, type LightColor } from "@/lib/fairy-lights";

export function FairyLights({ type, color = "warm" }: { type: FairyLightType; color?: LightColor | undefined }) {
  const height = type === "curtainlights" ? 210 : type === "lights" ? 48 : type === "vinelights" ? 88 : 90;
  const bulb = (x: number, y: number, index: number, shape: "star" | "globe" | "small" = "small") => (
    <g key={index} className="fairy-twinkle" style={{ animationDelay: `${index * .23}s` }} fill={lightColorAt(color, index)}>
      <circle cx={x} cy={y} r={shape === "small" ? 8 : 13} opacity=".15" />
      <circle cx={x} cy={y} r={shape === "small" ? 5 : 9} opacity=".2" />
      {shape === "star" ? <path d="M0 -8 L2.5 -2.6 L8 -2.5 L4 1.6 L5 7 L0 4.2 L-5 7 L-4 1.6 L-8 -2.5 L-2.5 -2.6Z" transform={`translate(${x} ${y})`} /> :
        <ellipse cx={x} cy={y} rx={shape === "globe" ? 6 : 2.6} ry={shape === "globe" ? 6 : 3.6} />}
      <circle cx={x - 1} cy={y - 1.5} r=".9" fill="var(--fairy-white)" opacity=".75" />
    </g>
  );
  return (
    <svg viewBox={`0 0 400 ${height}`} className="h-full w-full overflow-visible" aria-hidden="true" data-light-color={color}>
      {type === "curtainlights" ? <>
        <path d="M4 8 H396" stroke="var(--fairy-wire)" strokeWidth="1.5" fill="none" />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 16 + i * 33.4;
          const length = [174, 138, 190, 158][i % 4] ?? 174;
          return <g key={i}>
            <path d={`M${x} 8 Q${x - 4} ${length / 2} ${x} ${length}`} stroke="var(--fairy-wire)" strokeWidth="1" fill="none" />
            {Array.from({ length: 5 }, (_, j) => bulb(x - Math.sin(j) * 2, 24 + j * (length - 24) / 4, i * 5 + j))}
          </g>;
        })}
      </> : <>
        <path d={type === "lights" ? "M0 6 Q100 40 200 10 T400 8" : "M0 10 Q100 64 200 16 Q300 66 400 10"} stroke={type === "vinelights" ? "var(--fairy-leaf-dark)" : "var(--fairy-wire)"} strokeWidth="1.5" fill="none" />
        {Array.from({ length: type === "lights" ? 14 : 16 }, (_, i) => {
          const count = type === "lights" ? 14 : 16;
          const x = 14 + i * (372 / (count - 1));
          const t = x / 400;
          const y = type === "lights" ? (t < .5 ? 6 + Math.sin(t * 2 * Math.PI) * 18 + 8 : 10 + Math.sin((t - .5) * 2 * Math.PI) * 12) : 10 + 26 * Math.sin((t % .5) * 2 * Math.PI);
          return <g key={i}>
            {type === "vinelights" && <>
              <ellipse cx={x + 4} cy={y + 1} rx="7" ry="3.5" fill="var(--fairy-leaf)" transform={`rotate(-30 ${x + 4} ${y + 1})`} />
              <ellipse cx={x - 3} cy={y + 6} rx="6" ry="3" fill="var(--fairy-leaf-dark)" transform={`rotate(30 ${x - 3} ${y + 6})`} />
            </>}
            {(type === "starlights" || type === "globelights") && <path d={`M${x} ${y} v${i % 2 ? 17 : 27}`} stroke="var(--fairy-wire)" fill="none" />}
            {bulb(x, y + (type === "starlights" || type === "globelights" ? (i % 2 ? 17 : 27) : 6), i, type === "starlights" ? "star" : type === "globelights" ? "globe" : "small")}
          </g>;
        })}
      </>}
    </svg>
  );
}