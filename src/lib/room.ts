export type ItemType =
  | "window" | "lights" | "corkboard" | "calendar" | "clock" | "frame" | "shelf"
  | "desk" | "monitor" | "lamp" | "mug" | "inbox" | "plant" | "cat" | "rug" | "trash" | "books";

export interface RoomItem {
  id: string;
  type: ItemType;
  x: number; // % of room width (center)
  y: number; // % of room height (bottom anchor)
  scale: number;
  flip: boolean;
  z: number;
  photo?: string;
}

export const CATALOG: Record<ItemType, { label: string; w: number; ratio: number; group: "Wall" | "Furniture" | "Decor" }> = {
  window: { label: "Window", w: 16, ratio: 1.1, group: "Wall" },
  lights: { label: "String lights", w: 46, ratio: 0.12, group: "Wall" },
  corkboard: { label: "Corkboard", w: 20, ratio: 0.72, group: "Wall" },
  calendar: { label: "Calendar", w: 7, ratio: 1.25, group: "Wall" },
  clock: { label: "Clock", w: 7, ratio: 1, group: "Wall" },
  frame: { label: "Photo frame", w: 8, ratio: 1.2, group: "Decor" },
  shelf: { label: "Bookshelf", w: 16, ratio: 1.6, group: "Furniture" },
  desk: { label: "Desk", w: 30, ratio: 0.5, group: "Furniture" },
  rug: { label: "Rug", w: 36, ratio: 0.18, group: "Furniture" },
  monitor: { label: "Monitor", w: 13, ratio: 0.85, group: "Decor" },
  lamp: { label: "Desk lamp", w: 6, ratio: 1.5, group: "Decor" },
  mug: { label: "Coffee mug", w: 3.2, ratio: 1.1, group: "Decor" },
  inbox: { label: "Inbox tray", w: 9, ratio: 0.38, group: "Decor" },
  books: { label: "Book stack", w: 6, ratio: 0.7, group: "Decor" },
  plant: { label: "Plant", w: 8, ratio: 1.5, group: "Decor" },
  cat: { label: "Sleeping cat", w: 9, ratio: 0.55, group: "Decor" },
  trash: { label: "Wastebasket", w: 6, ratio: 1.2, group: "Decor" },
};

export const THEMES = [
  { id: "cream", label: "Cream morning" },
  { id: "dusk", label: "Golden dusk" },
  { id: "sage", label: "Sage cottage" },
  { id: "night", label: "Midnight cozy" },
] as const;
export type ThemeId = (typeof THEMES)[number]["id"];

let n = 0;
const mk = (type: ItemType, x: number, y: number, z: number, scale = 1): RoomItem => ({
  id: `d${n++}`, type, x, y, scale, flip: false, z,
});

export const DEFAULT_ITEMS: RoomItem[] = [
  mk("lights", 50, 14, 1),
  mk("window", 16, 52, 1),
  mk("corkboard", 48, 46, 1),
  mk("calendar", 66, 42, 1),
  mk("clock", 33, 28, 1),
  mk("rug", 50, 97, 2),
  mk("shelf", 85, 86, 3),
  mk("desk", 48, 86, 4),
  mk("monitor", 45, 63, 5),
  mk("lamp", 59, 63, 5),
  mk("mug", 52, 63, 6),
  mk("inbox", 36, 63, 6),
  mk("plant", 9, 92, 6),
  mk("cat", 70, 95, 7),
  mk("trash", 24, 95, 6),
];

export const STORAGE_KEY = "cozy-room-v1";
