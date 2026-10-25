import { useEffect, useState } from "react";

export interface ShelfFile {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string;
  added: number;
}
export interface Pin {
  id: string;
  text: string;
  color: PinColor;
  added: number;
  image?: string;
}
export interface Task {
  id: string;
  text: string;
  done: boolean;
  added: number;
}
export interface Track {
  id: string;
  title: string;
 url: string;
 added: number;
}
export type PinColor = "yellow" | "pink" | "blue" | "green";
export const PIN_COLORS: PinColor[] = ["yellow", "pink", "blue", "green"];

export interface OrganizerData {
  files: ShelfFile[];
  pins: Pin[];
  tasks: Task[];
  tracks: Track[];
}
const KEY = "cozy-organizer-v1";
export const MAX_FILE_BYTES = 1_000_000;

export function useOrganizer() {
  const [data, setData] = useState<OrganizerData>({ files: [], pins: [], tasks: [], tracks: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s) setData({ files: s.files ?? [], pins: s.pins ?? [], tasks: s.tasks ?? [], tracks: s.tracks ?? [] });
    } catch {
      // corrupt or missing storage — start fresh
    }
    setLoaded(true);
  }, []);
  const save = (next: OrganizerData) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setData(next);
      return true;
    } catch {
      return false; // storage full
    }
  };
  return { data, loaded, save };
}

export const uid = () => crypto.randomUUID();
export const fmtSize = (b: number) =>
  b < 1024
    ? `${b} B`
    : b < 1048576
      ? `${(b / 1024).toFixed(0)} KB`
      : `${(b / 1048576).toFixed(1)} MB`;
