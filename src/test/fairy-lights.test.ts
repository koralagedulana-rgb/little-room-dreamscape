import { describe, expect, it } from "vitest";
import { isFairyLight, LIGHT_COLORS, lightColorAt } from "@/lib/fairy-lights";
import { CATALOG } from "@/lib/room";

describe("fairy-light customization", () => {
  it("supports existing lights and three new wall variations", () => {
    for (const type of ["lights", "vinelights", "curtainlights", "starlights", "globelights"] as const) {
      expect(isFairyLight(type)).toBe(true);
      expect(CATALOG[type].group).toBe("Wall");
    }
    expect(isFairyLight("plant")).toBe(false);
  });
  it("keeps individual colors consistent and multicolor varied", () => {
    expect(lightColorAt("green", 0)).toBe("var(--fairy-green)");
    expect(lightColorAt("green", 4)).toBe("var(--fairy-green)");
    expect(lightColorAt("multicolor", 0)).not.toBe(lightColorAt("multicolor", 1));
    expect(LIGHT_COLORS.map(c => c.id)).toContain("warm");
  });
});