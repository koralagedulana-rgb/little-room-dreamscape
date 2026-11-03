export const LIGHT_COLORS = [
  { id: "warm", label: "Warm amber" },
  { id: "white", label: "Soft white" },
  { id: "rose", label: "Rose" },
  { id: "green", label: "Emerald" },
  { id: "blue", label: "Ice blue" },
  { id: "lavender", label: "Lavender" },
  { id: "multicolor", label: "Multicolor" },
] as const;
export type LightColor = (typeof LIGHT_COLORS)[number]["id"];
export type FairyLightType = "lights" | "vinelights" | "curtainlights" | "starlights" | "globelights";
export const isFairyLight = (type: string): type is FairyLightType =>
  ["lights", "vinelights", "curtainlights", "starlights", "globelights"].includes(type);
export const lightColorAt = (color: LightColor, index: number) =>
  `var(--fairy-${color === "multicolor" ? ["rose", "warm", "green", "blue", "lavender"][index % 5] : color})`;