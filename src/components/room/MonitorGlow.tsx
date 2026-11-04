import { usePlayer } from "@/components/room/player";

/** Soft screen light cast into the study while a video is on the monitor. */
export function MonitorGlow() {
  const p = usePlayer();
  const on = !!p.current && (p.status === "playing" || p.status === "buffering");
  return (
    <div
      aria-hidden="true"
      data-on={on}
      className="monitor-glow pointer-events-none absolute left-1/2 top-[35%] h-[260%] w-[260%] -translate-x-1/2 -translate-y-1/2"
    />
  );
}
