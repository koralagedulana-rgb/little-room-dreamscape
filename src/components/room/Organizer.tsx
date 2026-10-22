import { useRef, useState, type ReactNode } from "react";
import { FileText, Download, Trash2, Upload, X, Plus } from "lucide-react";
import { fmtSize, MAX_FILE_BYTES, PIN_COLORS, uid, type OrganizerData, type PinColor } from "@/lib/organizer";

export type Panel = "shelf" | "corkboard" | "inbox";
type Props = { panel: Panel; data: OrganizerData; save: (d: OrganizerData) => boolean; onClose: () => void };

const TITLES: Record<Panel, [string, string]> = {
  shelf: ["File shelf", "Keep small files tucked away on your bookshelf."],
  corkboard: ["Corkboard", "Pin notes and reminders to your board."],
  inbox: ["Task inbox", "Drop tasks in the tray and tick them off."],
};

export function OrganizerPanel({ panel, data, save, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-card p-6 shadow-[var(--shadow-room)]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl">{TITLES[panel][0]}</h2>
            <p className="text-sm text-muted-foreground">{TITLES[panel][1]}</p>
          </div>
          <button aria-label="Close" onClick={onClose} className="rounded-full p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
        </div>
        {panel === "shelf" && <Shelf data={data} save={save} />}
        {panel === "corkboard" && <Board data={data} save={save} />}
        {panel === "inbox" && <Inbox data={data} save={save} />}
      </div>
    </div>
  );
}

type Sub = { data: OrganizerData; save: Props["save"] };
const Empty = ({ children }: { children: ReactNode }) => <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">{children}</p>;

function Shelf({ data, save }: Sub) {
  const ref = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState("");
  const onFiles = async (list: FileList | null) => {
    if (!list) return;
    setErr("");
    let next = data;
    for (const f of Array.from(list)) {
      if (f.size > MAX_FILE_BYTES) { setErr(`"${f.name}" is over 1 MB.`); continue; }
      const dataUrl = await new Promise<string>((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result as string); fr.readAsDataURL(f); });
      next = { ...next, files: [{ id: uid(), name: f.name, size: f.size, type: f.type, data: dataUrl, added: Date.now() }, ...next.files] };
    }
    if (!save(next)) setErr("Your shelf is full — remove some files first.");
  };
  return (
    <div className="space-y-3">
      <button onClick={() => ref.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
        <Upload className="h-4 w-4" /> Add files
      </button>
      <input ref={ref} type="file" multiple hidden onChange={(e) => { onFiles(e.target.files); e.target.value = ""; }} />
      {err && <p className="text-sm text-destructive">{err}</p>}
      {data.files.length === 0 ? <Empty>No files yet. Files up to 1 MB each.</Empty> : (
        <ul className="space-y-2">
          {data.files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 rounded-xl bg-secondary p-2.5">
              {f.type.startsWith("image/") ? <img src={f.data} alt="" className="h-10 w-10 rounded-md object-cover" /> : <FileText className="h-10 w-10 p-2 text-primary" />}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{f.name}</p>
                <p className="text-xs text-muted-foreground">{fmtSize(f.size)}</p>
              </div>
              <a href={f.data} download={f.name} aria-label="Download" className="rounded-lg p-2 hover:bg-background"><Download className="h-4 w-4" /></a>
              <button aria-label="Remove" onClick={() => save({ ...data, files: data.files.filter((x) => x.id !== f.id) })} className="rounded-lg p-2 text-destructive hover:bg-background"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Board({ data, save }: Sub) {
  const [text, setText] = useState("");
  const [color, setColor] = useState<PinColor>("yellow");
  const add = () => {
    if (!text.trim()) return;
    save({ ...data, pins: [{ id: uid(), text: text.trim(), color, added: Date.now() }, ...data.pins] });
    setText("");
  };
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={120} rows={2} placeholder="Write a note…" className="w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
        <div className="flex items-center gap-2">
          {PIN_COLORS.map((c) => (
            <button key={c} aria-label={c} onClick={() => setColor(c)} className={`note-${c} h-7 w-7 rounded-full border-2 ${color === c ? "border-foreground" : "border-transparent"}`} />
          ))}
          <button onClick={add} className="ml-auto flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Pin it</button>
        </div>
      </div>
      {data.pins.length === 0 ? <Empty>Your board is empty.</Empty> : (
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[oklch(0.72_0.08_65)] p-3">
          {data.pins.map((p, i) => (
            <div key={p.id} className={`note-${p.color} group relative min-h-20 p-3 pt-4 font-hand text-lg leading-tight shadow-md`} style={{ transform: `rotate(${(i % 3) - 1}deg)` }}>
              <span className="absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-destructive" />
              {p.text}
              <button aria-label="Unpin" onClick={() => save({ ...data, pins: data.pins.filter((x) => x.id !== p.id) })} className="absolute right-1 top-1 rounded p-0.5 opacity-0 group-hover:opacity-100"><X className="h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Inbox({ data, save }: Sub) {
  const [text, setText] = useState("");
  const add = () => {
    if (!text.trim()) return;
    save({ ...data, tasks: [...data.tasks, { id: uid(), text: text.trim(), done: false, added: Date.now() }] });
    setText("");
  };
  const open = data.tasks.filter((t) => !t.done), done = data.tasks.filter((t) => t.done);
  const row = (t: OrganizerData["tasks"][number]) => (
    <li key={t.id} className="group flex items-center gap-3 rounded-xl bg-secondary px-3 py-2">
      <input type="checkbox" checked={t.done} onChange={() => save({ ...data, tasks: data.tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)) })} className="h-4 w-4 accent-primary" />
      <span className={`flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}>{t.text}</span>
      <button aria-label="Delete task" onClick={() => save({ ...data, tasks: data.tasks.filter((x) => x.id !== t.id) })} className="text-destructive opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
    </li>
  );
  return (
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); add(); }} className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task…" className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        <button className="rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Add</button>
      </form>
      {data.tasks.length === 0 ? <Empty>Inbox zero ✨</Empty> : (
        <>
          <ul className="space-y-2">{open.map(row)}</ul>
          {done.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Done · {done.length}</span>
                <button onClick={() => save({ ...data, tasks: open })} className="hover:text-foreground">Clear done</button>
              </div>
              <ul className="space-y-2">{done.map(row)}</ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
