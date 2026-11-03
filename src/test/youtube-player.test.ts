import { describe, expect, it } from "vitest";
import { formatPlaybackTime, playbackStatus } from "@/lib/youtube-player";

describe("confirmed YouTube playback", () => {
  it("only reports playing for YouTube state 1", () => {
    expect(playbackStatus(1)).toBe("playing");
    for (const state of [-1, 0, 2, 3, 5]) expect(playbackStatus(state)).not.toBe("playing");
  });
  it("rests for paused and ended audio", () => {
    expect(playbackStatus(2)).toBe("paused");
    expect(playbackStatus(0)).toBe("ended");
  });
  it("distinguishes buffering from playback", () => {
    expect(playbackStatus(3)).toBe("buffering");
  });
  it("formats real elapsed time without invalid negative values", () => {
    expect(formatPlaybackTime(125.9)).toBe("2:05");
    expect(formatPlaybackTime(-1)).toBe("0:00");
    expect(formatPlaybackTime(Number.NaN)).toBe("0:00");
  });
});