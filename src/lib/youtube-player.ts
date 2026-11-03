export type PlaybackStatus = "idle" | "loading" | "playing" | "paused" | "ended" | "buffering" | "error";

export const playbackStatus = (state: number): PlaybackStatus => {
  switch (state) {
    case 1: return "playing";
    case 2: return "paused";
    case 0: return "ended";
    case 3: return "buffering";
    default: return "loading";
  }
};

export function formatPlaybackTime(seconds: number) {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const minutes = Math.floor(safe / 60);
  return `${minutes}:${String(safe % 60).padStart(2, "0")}`;
}

export type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  setVolume: (value: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  getVideoData: () => { title?: string; author?: string; video_id?: string };
  destroy: () => void;
};
type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    width: number;
    height: number;
    videoId?: string;
    playerVars: Record<string, string | number>;
    events: {
      onReady: (event: { target: YouTubePlayer }) => void;
      onStateChange: (event: { data: number }) => void;
      onError: (event: { data: number }) => void;
    };
  }) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeAPI> | undefined;
export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const timer = window.setTimeout(() => {
      apiPromise = undefined;
      reject(new Error("YouTube couldn't be reached."));
    }, 15000);
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      window.clearTimeout(timer);
      if (window.YT?.Player) resolve(window.YT);
      else { apiPromise = undefined; reject(new Error("YouTube player unavailable.")); }
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => {
      window.clearTimeout(timer);
      script.remove();
      apiPromise = undefined;
      reject(new Error("YouTube couldn't be reached."));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}