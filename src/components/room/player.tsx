import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export const isList = (k: string) => k.startsWith("list:");
const embedSrc = (k: string) =>
  isList(k)
    ? `https://www.youtube.com/embed/videoseries?list=${k.slice(5)}&autoplay=1&enablejsapi=1&rel=0`
    : `https://www.youtube.com/embed/${k}?autoplay=1&enablejsapi=1&rel=0`;

type Player = {
  current: string | null;
  title: string;
  playing: boolean;
  volume: number;
  play: (key: string, title: string) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
};

const Ctx = createContext<Player | null>(null);
export const usePlayer = () => {
  const p = useContext(Ctx);
  if (!p) throw new Error("usePlayer needs PlayerProvider");
  return p;
};

/** Keeps one hidden YouTube player alive for the whole room so music continues in the background. */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [playing, setPlaying] = useState(false);
  const [volume, setVol] = useState(70);
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const v = Number(localStorage.getItem("cozy-volume"));
    if (Number.isFinite(v) && v > 0) setVol(v);
    const onMsg = (e: MessageEvent) => {
      if (!String(e.origin).includes("youtube")) return;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        const st = d?.info?.playerState;
        if (st === 1) setPlaying(true);
        else if (st === 2 || st === 0) setPlaying(false);
      } catch {
        // ignore non-JSON messages
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const cmd = (func: string, args: unknown[] = []) =>
    ref.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");

  const value: Player = {
    current,
    title,
    playing,
    volume,
    play: (key, t) => {
      if (key === current) {
        cmd(playing ? "pauseVideo" : "playVideo");
        setPlaying(!playing);
      } else {
        setCurrent(key);
        setTitle(t);
        setPlaying(true);
      }
    },
    toggle: () => {
      if (!current) return;
      cmd(playing ? "pauseVideo" : "playVideo");
      setPlaying(!playing);
    },
    next: () => cmd("nextVideo"),
    prev: () => cmd("previousVideo"),
    setVolume: (v) => {
      setVol(v);
      cmd("setVolume", [v]);
      try {
        localStorage.setItem("cozy-volume", String(v));
      } catch {
        // ignore
      }
    },
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      {current && (
        <iframe
          ref={ref}
          key={current}
          src={embedSrc(current)}
          title="Room music"
          allow="autoplay; encrypted-media"
          onLoad={() => {
            ref.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), "*");
            setTimeout(() => cmd("setVolume", [volume]), 600);
          }}
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none fixed -left-[400px] top-0 h-[200px] w-[200px] opacity-0"
        />
      )}
    </Ctx.Provider>
  );
}
