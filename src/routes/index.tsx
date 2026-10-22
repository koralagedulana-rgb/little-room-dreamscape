import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type PointerEvent as RPE } from "react";
import { ItemArt } from "@/components/room/ItemArt";
import { OrganizerPanel, type Panel } from "@/components/room/Organizer";
import { useOrganizer } from "@/lib/organizer";
import { CATALOG, DEFAULT_ITEMS, STORAGE_KEY, THEMES, type ItemType, type RoomItem, type ThemeId } from "@/lib/room";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nook — Cozy Desktop Room Builder" },
      { name: "description", content: "Design your own tiny cozy desktop room: arrange a desk, bookshelf, plants, lights and a sleeping cat." },
      { property: "og:title", content: "Nook — Cozy Desktop Room Builder" },
      { property: "og:description", content: "Arrange a cozy little room with desks, plants, string lights and a sleeping cat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Builder,
});

const PANEL_OF: Partial<Record<ItemType, Panel>> = { shelf: "shelf", corkboard: "corkboard", inbox: "inbox" };
const GROUPS = ["Wall", "Furniture", "Decor"] as const;

function Builder() {
  const [items, setItems] = useState<RoomItem[]>(DEFAULT_ITEMS);
  const [theme, setTheme] = useState<ThemeId>("cream");
  const [sel, setSel] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const org = useOrganizer();
  const roomRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (s?.items) setItems(s.items);
      if (s?.theme) setTheme(s.theme);
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, theme }));
  }, [items, theme, loaded]);

  const update = (id: string, p: Partial<RoomItem>) => setItems((a) => a.map((i) => (i.id === id ? { ...i, ...p } : i)));
  const maxZ = () => Math.max(0, ...items.map((i) => i.z));
  const selected = items.find((i) => i.id === sel);

  const add = (type: ItemType) => {
    const it: RoomItem = { id: crypto.randomUUID(), type, x: 50, y: CATALOG[type].group === "Wall" ? 45 : 90, scale: 1, flip: false, z: maxZ() + 1 };
    setItems((a) => [...a, it]);
    setSel(it.id);
  };

  const onDown = (e: RPE, it: RoomItem) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setSel(it.id);
    drag.current = { id: it.id, sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y, moved: false };
  };
  const onMove = (e: RPE) => {
    const d = drag.current, r = roomRef.current?.getBoundingClientRect();
    if (!d || !r) return;
    if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 4) d.moved = true;
    if (!d.moved) return;
    const x = Math.min(100, Math.max(0, d.ox + ((e.clientX - d.sx) / r.width) * 100));
    const y = Math.min(104, Math.max(4, d.oy + ((e.clientY - d.sy) / r.height) * 100));
    update(d.id, { x, y });
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (!sel || (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "Delete" || e.key === "Backspace") { setItems((a) => a.filter((i) => i.id !== sel)); setSel(null); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [sel]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-end justify-between px-6 pt-6 pb-4 md:px-10">
        <div>
          <h1 className="font-display text-4xl tracking-tight">nook<span className="text-primary">.</span></h1>
          <p className="text-sm text-muted-foreground">build your tiny cozy desktop room</p>
        </div>
        <button onClick={() => { setItems(DEFAULT_ITEMS); setTheme("cream"); setSel(null); }} className="rounded-full border border-border px-4 py-1.5 text-sm hover:bg-secondary">
          Reset room
        </button>
      </header>

      <main className="grid gap-6 px-6 pb-10 md:px-10 lg:grid-cols-[1fr_300px]">
        <div
          ref={roomRef}
          data-theme={theme}
          onPointerMove={onMove}
          onPointerUp={() => {
            const d = drag.current;
            drag.current = null;
            if (d && !d.moved) {
              const t = items.find((i) => i.id === d.id)?.type;
              if (t && PANEL_OF[t]) setPanel(PANEL_OF[t]!);
            }
          }}
          onPointerDown={() => setSel(null)}
          className="room relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-3xl shadow-[var(--shadow-room)]"
        >
          <div className="absolute inset-x-0 top-0 h-[78%] bg-[var(--room-wall)]" />
          <div className="absolute inset-x-0 top-[77%] h-[2%] bg-[var(--room-trim)]" />
          <div className="room-floor absolute inset-x-0 bottom-0 h-[22%]" />
          {[...items].sort((a, b) => a.z - b.z).map((it) => {
            const c = CATALOG[it.type];
            const w = c.w * it.scale;
            return (
              <div
                key={it.id}
                onPointerDown={(e) => onDown(e, it)}
                className={`absolute cursor-grab active:cursor-grabbing ${sel === it.id ? "outline-2 outline-dashed outline-offset-4 outline-[var(--room-ink)] rounded" : ""}`}
                style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${w}%`, aspectRatio: `1 / ${c.ratio}`, transform: `translate(-50%,-100%) scaleX(${it.flip ? -1 : 1})`, zIndex: it.z }}
              >
                {it.type === "lamp" && <div className="room-glow pointer-events-none absolute left-1/2 top-[30%] h-[400%] w-[700%] -translate-x-1/2 -translate-y-1/2" />}
                <ItemArt type={it.type} />
                {it.type === "corkboard" && org.data.pins.length > 0 && (
                  <div className="pointer-events-none absolute inset-[6%] grid grid-cols-3 gap-[4%] bg-[oklch(0.75_0.08_65)] p-[4%]">
                    {org.data.pins.slice(0, 6).map((p, i) => (
                      <div key={p.id} className={`note-${p.color} overflow-hidden p-[6%] font-hand leading-none shadow`} style={{ fontSize: `${0.55 * it.scale}vw`, transform: `rotate(${(i % 3) - 1 * 2}deg)` }}>{p.text}</div>
                    ))}
                  </div>
                )}
                {it.type === "inbox" && <Badge n={org.data.tasks.filter((t) => !t.done).length} />}
                {it.type === "shelf" && <Badge n={org.data.files.length} />}
              </div>
            );
          })}
          <div className="room-ambient pointer-events-none absolute inset-0" style={{ zIndex: 999 }} />
        </div>

        <aside className="space-y-6">
          <section>
            <h2 className="mb-2 font-display text-lg">Mood</h2>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((t) => (
                <button key={t.id} data-theme={t.id} onClick={() => setTheme(t.id)}
                  className={`room flex items-center gap-2 rounded-xl border p-2 text-left text-sm ${theme === t.id ? "border-primary ring-2 ring-primary/30" : "border-border"}`}>
                  <span className="h-6 w-6 shrink-0 rounded-full border border-border" style={{ background: "linear-gradient(135deg, var(--room-wall) 50%, var(--room-floor) 50%)" }} />
                  <span className="text-foreground">{t.label}</span>
                </button>
              ))}
            </div>
          </section>

          {selected && (
            <section className="rounded-2xl bg-card p-4 shadow-sm">
              <h2 className="mb-3 font-display text-lg">{CATALOG[selected.type].label}</h2>
              {PANEL_OF[selected.type] && (
                <button onClick={() => setPanel(PANEL_OF[selected.type]!)} className="mb-3 w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Open {selected.type === "shelf" ? "files" : selected.type === "inbox" ? "tasks" : "notes"}
                </button>
              )}
              <label className="mb-3 block text-sm text-muted-foreground">
                Size
                <input type="range" min={0.4} max={2.2} step={0.05} value={selected.scale} onChange={(e) => update(selected.id, { scale: +e.target.value })} className="mt-1 w-full accent-primary" />
              </label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button className="rounded-lg bg-secondary px-2 py-1.5" onClick={() => update(selected.id, { z: maxZ() + 1 })}>Bring front</button>
                <button className="rounded-lg bg-secondary px-2 py-1.5" onClick={() => update(selected.id, { z: Math.min(...items.map((i) => i.z)) - 1 })}>Send back</button>
                <button className="rounded-lg bg-secondary px-2 py-1.5" onClick={() => update(selected.id, { flip: !selected.flip })}>Flip</button>
                <button className="rounded-lg bg-destructive/10 px-2 py-1.5 text-destructive" onClick={() => { setItems((a) => a.filter((i) => i.id !== selected.id)); setSel(null); }}>Remove</button>
              </div>
            </section>
          )}

          {GROUPS.map((g) => (
            <section key={g}>
              <h2 className="mb-2 font-display text-lg">{g}</h2>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(CATALOG) as ItemType[]).filter((k) => CATALOG[k].group === g).map((k) => (
                  <button key={k} onClick={() => add(k)} data-theme={theme}
                    className="room group flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-2 text-xs transition hover:-translate-y-0.5 hover:border-primary">
                    <div className="flex h-10 w-full items-center justify-center"><div className="h-full" style={{ aspectRatio: `1 / ${CATALOG[k].ratio}`, maxWidth: "100%" }}><ItemArt type={k} /></div></div>
                    <span className="text-muted-foreground">{CATALOG[k].label}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
          <p className="text-xs text-muted-foreground">Drag items to arrange. Click the bookshelf, corkboard or inbox tray to open your files, notes and tasks. Your room saves automatically on this device.</p>
        </aside>
      </main>
      {panel && <OrganizerPanel panel={panel} data={org.data} save={org.save} onClose={() => setPanel(null)} />}
    </div>
  );
}

function Badge({ n }: { n: number }) {
  if (!n) return null;
  return <span className="pointer-events-none absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground shadow">{n}</span>;
}
