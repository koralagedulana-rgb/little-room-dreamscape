import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { loadYouTubeAPI, playbackStatus, type PlaybackStatus, type YouTubePlayer } from "@/lib/youtube-player";

export const isList = (k: string) => k.startsWith("list:");
type Player = {
  current: string | null;
  title: string;
  artist: string;
  playing: boolean;
  status: PlaybackStatus;
  error: string;
  elapsed: number;
  duration: number;
  volume: number;
  play: (key: string, title: string) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
};
const Ctx = createContext<Player | null>(null);
export const usePlayer = () => {
  const p = useContext(Ctx);
  if (!p) throw new Error("usePlayer needs PlayerProvider");
  return p;
};

/** One persistent official YouTube player; menu visibility never owns playback. */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVol] = useState(70);
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<YouTubePlayer | null>(null);
  const volumeRef = useRef(volume);
  const fallbackTitle = useRef("");
  const desiredPlaying = useRef(false);
  const playing = status === "playing";

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cozy-volume");
      const v = Number(stored);
      if (stored !== null && Number.isFinite(v) && v >= 0 && v <= 100) {
        setVol(v);
        volumeRef.current = v;
      }
    } catch { /* storage can be disabled by the wallpaper host */ }
  }, []);

  useEffect(() => {
    if (!current || !host.current) return;
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    let instance: YouTubePlayer | null = null;
    const container = host.current;
    const mount = document.createElement("div");
    container.replaceChildren(mount);
    const read = () => {
      if (!instance || cancelled) return;
      const data = instance.getVideoData();
      setTitle(data.title || fallbackTitle.current);
      setArtist(data.author || "");
      const time = instance.getCurrentTime();
      const length = instance.getDuration();
      setElapsed(Number.isFinite(time) ? Math.max(0, time) : 0);
      setDuration(Number.isFinite(length) ? Math.max(0, length) : 0);
    };
    loadYouTubeAPI().then((yt) => {
      if (cancelled) return;
      instance = new yt.Player(mount, {
        width: 200,
        height: 200,
        ...(isList(current) ? {} : { videoId: current }),
        playerVars: {
          autoplay: 1, playsinline: 1, rel: 0, origin: window.location.origin,
          ...(isList(current) ? { listType: "playlist", list: current.slice(5) } : {}),
        },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return;
            api.current = target;
            target.setVolume(volumeRef.current);
            if (desiredPlaying.current) target.playVideo();
            else target.pauseVideo();
            timer = setInterval(read, 500);
            read();
          },
          onStateChange: ({ data }) => {
            if (cancelled) return;
            setStatus(playbackStatus(data));
            if (data === 1) desiredPlaying.current = true;
            else if (data === 2 || data === 0) desiredPlaying.current = false;
            if (data === 1) setError("");
            read();
          },
          onError: ({ data }) => {
            if (cancelled) return;
            setStatus("error");
            setError(data === 101 || data === 150
              ? "This track can't play here. Open it in YouTube Music or choose another track."
              : data === 153
                ? "YouTube couldn't verify this wallpaper player. Open this track in YouTube Music."
                : "This track couldn't be played. Try another public YouTube link.");
          },
        },
      });
    }).catch(() => {
      if (!cancelled) {
        setStatus("error");
        setError("YouTube couldn't be reached. Check your connection, then try playing again.");
      }
    });
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      api.current = null;
      instance?.destroy();
      container.replaceChildren();
    };
  }, [current]);

  const toggle = () => {
    if (!current) return;
    desiredPlaying.current = !desiredPlaying.current;
    if (desiredPlaying.current) api.current?.playVideo();
    else api.current?.pauseVideo();
  };
  const value: Player = {
    current, title, artist, playing, status, error, elapsed, duration, volume,
    play: (key, t) => {
      if (key === current && status !== "error") { toggle(); return; }
      fallbackTitle.current = t;
      desiredPlaying.current = true;
      setTitle(t);
      setArtist("");
      setElapsed(0);
      setDuration(0);
      setError("");
      setStatus("loading");
      if (key === current) {
        // Remount on retry, including a failed API-script load.
        setCurrent(null);
        window.setTimeout(() => setCurrent(key), 0);
      } else setCurrent(key);
    },
    toggle,
    next: () => api.current?.nextVideo(),
    prev: () => api.current?.previousVideo(),
    seek: (seconds) => {
      if (!duration) return;
      api.current?.seekTo(Math.min(duration, Math.max(0, seconds)), true);
    },
    setVolume: (v) => {
      const bounded = Math.min(100, Math.max(0, v));
      setVol(bounded);
      volumeRef.current = bounded;
      api.current?.setVolume(bounded);
      try { localStorage.setItem("cozy-volume", String(bounded)); } catch { /* optional */ }
    },
  };
  return (
    <Ctx.Provider value={value}>
      {children}
      <MonitorFollower status={status} current={current} />
      <div
        ref={host}
        aria-hidden="true"
        data-video-host
        className="monitor-video pointer-events-none fixed -left-[400px] top-0 h-[200px] w-[200px] overflow-hidden opacity-0"
      />
    </Ctx.Provider>
  );
}

/** Keeps the single player pinned over the monitor's screen without moving the iframe (moving reloads it). */
function MonitorFollower({ status, current }: { status: PlaybackStatus; current: string | null }) {
  useEffect(() => {
    const showing = !!current && (status === "playing" || status === "paused" || status === "buffering");
    let frame = 0;
    const tick = () => {
      const el = document.querySelector<HTMLElement>("[data-video-host]");
      const screen = document.querySelector<HTMLElement>("[data-monitor-screen]");
      if (el) {
        const r = screen?.getBoundingClientRect();
        if (showing && r && r.width > 4) {
          const item = screen!.closest<HTMLElement>("[data-room-item]");
          Object.assign(el.style, {
            left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`,
            opacity: "1", zIndex: item?.style.zIndex || "1",
          });
        } else {
          Object.assign(el.style, { left: "-400px", top: "0px", width: "200px", height: "200px", opacity: "0" });
        }
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [status, current]);
  return null;
}
