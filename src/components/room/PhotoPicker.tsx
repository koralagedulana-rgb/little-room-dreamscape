import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhotoPicker({ photo, onChange }: { photo?: string; onChange: (photo?: string) => boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const choose = async (file?: File) => {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose a picture.");
      return;
    }
    setBusy(true);
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      const canvas = document.createElement("canvas");
      const ratio = Math.min(1, 1280 / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Cannot read image");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      if (!onChange(canvas.toDataURL("image/webp", 0.85))) {
        setError("This browser’s storage is full. Try a smaller picture or remove another photo.");
      }
    } catch {
      setError("This picture couldn’t be opened. Try a JPG, PNG or WebP image.");
    } finally {
      URL.revokeObjectURL(url);
      setBusy(false);
    }
  };

  return (
    <div className="mb-4 space-y-2">
      <input ref={input} type="file" accept="image/*" aria-label="Choose frame photo" className="hidden"
        onChange={(e) => { void choose(e.target.files?.[0]); e.target.value = ""; }} />
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" disabled={busy} onClick={() => input.current?.click()}>
          <ImagePlus />{busy ? "Adding photo…" : photo ? "Replace photo" : "Add photo"}
        </Button>
        {photo && <Button variant="ghost" size="icon" aria-label="Remove photo" title="Remove photo" disabled={busy}
          onClick={() => { setError(onChange(undefined) ? "" : "The photo couldn’t be removed. Please try again."); }}><Trash2 /></Button>}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}