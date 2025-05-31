import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, ImagePlus, X } from "lucide-react";

export default function ImageUploader({ onSelect, onRemove, preview }) {
  const fileRef = useRef(null);
  const [error, setError] = useState("");

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError("");
    onSelect(file);
  }

  return (
    <div className="space-y-2">
      {!preview ? (
        <>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => fileRef.current.click()}
              className="flex items-center gap-2"
            >
              <ImagePlus className="w-4 h-4" /> Select from Gallery
            </Button>

            <Button
              variant="outline"
              onClick={() => fileRef.current.click()}
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" /> Capture Photo
            </Button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handleFile}
          />
        </>
      ) : (
        <div className="relative w-full max-w-sm">
          <img
            src={preview}
            alt="preview"
            className="w-full rounded-xl border object-contain"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={onRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
