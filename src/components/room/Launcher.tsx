import { useEffect, useState } from "react";
import { ExternalLink, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LAUNCHER_KEY = "cozy-launcher-v1";

export type Bookmark = { id: string; name: string; url: string };
export type LauncherData = { home: string; direct: boolean; bookmarks: Bookmark[] };

const DEFAULTS: LauncherData = {
  home: "https://www.google.com",
  direct: false,
  bookmarks: [
    { id: "yt", name: "YouTube", url: "https://www.youtube.com" },
    { id: "gm", name: "Gmail", url: "https://mail.google.com" },
    { id: "gh", name: "GitHub", url: "https://github.com" },
    { id: "nt", name: "Notion", url: "https://www.notion.so" },
  ],
};

export function loadLauncher(): LauncherData {
  try {
    const raw = localStorage.getItem(LAUNCHER_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULTS;
}

export function normalizeUrl(u: string): string | null {
  const s = u.trim();
  if (!s) return null;
  const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const url = new URL(withProto);
    if (!/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Opens in a new tab — inside Lively Wallpaper this launches the default browser. */
export function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function Launcher() {
  const [data, setData] = useState<LauncherData>(DEFAULTS);
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => setData(loadLauncher()), []);
  const save = (d: LauncherData) => {
    setData(d);
    try {
      localStorage.setItem(LAUNCHER_KEY, JSON.stringify(d));
    } catch {
      /* ignore */
    }
  };

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const s = q.trim();
    if (!s) return;
    const asUrl = !s.includes(" ") && s.includes(".") ? normalizeUrl(s) : null;
    openExternal(asUrl ?? `https://www.google.com/search?q=${encodeURIComponent(s)}`);
    setQ("");
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const n = normalizeUrl(url);
    if (!n) return setErr("That doesn't look like a web address, e.g. github.com");
    setErr("");
    save({
      ...data,
      bookmarks: [
        ...data.bookmarks,
        { id: crypto.randomUUID(), name: name.trim() || new URL(n).hostname, url: n },
      ],
    });
    setName("");
    setUrl("");
  };

  return (
    <div className="space-y-5">
      <form onSubmit={search} className="flex gap-2">
        <Input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the web or type an address…"
          aria-label="Search the web"
        />
        <Button type="submit" size="icon" aria-label="Search">
          <Search />
        </Button>
      </form>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Speed dial</h3>
        <div className="grid grid-cols-2 gap-2">
          {data.bookmarks.map((b) => (
            <div key={b.id} className="group flex items-center rounded-xl border bg-muted/40">
              <button
                onClick={() => openExternal(b.url)}
                className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm hover:text-primary"
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${new URL(b.url).hostname}&sz=32`}
                  alt=""
                  className="h-4 w-4 shrink-0"
                />
                <span className="truncate">{b.name}</span>
              </button>
              <button
                onClick={() => save({ ...data, bookmarks: data.bookmarks.filter((x) => x.id !== b.id) })}
                aria-label={`Remove ${b.name}`}
                className="px-2 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100 focus:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={add} className="mt-2 flex gap-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-28" />
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="website.com" />
          <Button type="submit" size="icon" variant="outline" aria-label="Add bookmark">
            <Plus />
          </Button>
        </form>
        {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
      </div>

      <div className="space-y-2 rounded-xl border p-3">
        <label className="block text-sm font-semibold">Home page</label>
        <div className="flex gap-2">
          <Input
            defaultValue={data.home}
            key={data.home}
            onBlur={(e) => {
              const n = normalizeUrl(e.target.value);
              if (n) save({ ...data, home: n });
            }}
          />
          <Button variant="outline" onClick={() => openExternal(data.home)}>
            <ExternalLink /> Open
          </Button>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.direct}
            onChange={(e) => save({ ...data, direct: e.target.checked })}
            className="accent-[var(--primary)]"
          />
          Clicking the monitor opens the home page directly
        </label>
        <p className="text-xs text-muted-foreground">
          In Lively Wallpaper, links open in your default browser (Vivaldi). To get back to this
          screen with direct launch on, use “Open screen” in the room menu.
        </p>
      </div>
    </div>
  );
}
