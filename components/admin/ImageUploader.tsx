"use client";

import { useRef, useState, useCallback } from "react";
import { UploadCloud, X, Loader2, Link2, Crop } from "lucide-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";

export interface UploadedImage {
  url: string;
  publicId: string;
}

function CropModal({
  imageSrc,
  onCancel,
  onCropCompleteConfirm,
}: {
  imageSrc: string;
  onCancel: () => void;
  onCropCompleteConfirm: (croppedFile: File) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      if (croppedImageFile) {
        onCropCompleteConfirm(croppedImageFile);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl h-[60vh] bg-zinc-950 border border-zinc-800 overflow-hidden rounded-lg">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-48"
        />
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="px-4 py-2 border border-zinc-700 bg-zinc-900 text-zinc-200 rounded text-sm hover:bg-zinc-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded text-sm hover:bg-blue-500 flex items-center gap-2 transition-colors shadow-sm"
        >
          {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <Crop size={16} />}
          Crop & Upload
        </button>
      </div>
    </div>
  );
}

export default function ImageUploader({
  value,
  onChange,
  label = "IMAGE",
}: {
  value?: UploadedImage | null;
  onChange: (image: UploadedImage | null) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState(value?.url ?? "");
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError("");
    try {
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "krishal-portfolio" }),
      });
      if (!signRes.ok) {
        const text = await signRes.text();
        throw new Error(text || "Could not get upload signature from server.");
      }
      const { timestamp, signature, apiKey, cloudName, folder } = await signRes.json();

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", apiKey);
      form.append("timestamp", String(timestamp));
      form.append("signature", signature);
      form.append("folder", folder);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: form,
      });
      if (!uploadRes.ok) {
        const errJson = await uploadRes.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || "Upload to Cloudinary failed.");
      }
      const data = await uploadRes.json();
      onChange({ url: data.secure_url, publicId: data.public_id });
      setCustomUrl(data.secure_url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) {
      onChange(null);
    } else {
      onChange({ url: trimmed, publicId: "" });
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setCropImageSrc(imageDataUrl);
    }
    e.target.value = "";
  };

  return (
    <div className="space-y-3">
      {cropImageSrc && (
        <CropModal
          imageSrc={cropImageSrc}
          onCancel={() => setCropImageSrc(null)}
          onCropCompleteConfirm={(croppedFile) => {
            setCropImageSrc(null);
            upload(croppedFile);
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-zinc-300 font-medium tracking-wider block">{label}</span>
        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          className="font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
        >
          <Link2 size={12} />
          {showUrlInput ? "Hide Direct URL" : "Or enter URL / path"}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {value?.url ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-zinc-700 rounded bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setCustomUrl("");
              }}
              className="absolute top-1 right-1 bg-zinc-900/90 text-zinc-300 hover:text-red-400 p-1 rounded"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="h-20 w-20 shrink-0 border border-dashed border-zinc-700 bg-zinc-900/80 rounded flex items-center justify-center text-zinc-400">
            <UploadCloud size={20} />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-4 py-2 rounded-md font-mono text-xs font-semibold tracking-wider shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
              {loading ? "UPLOADING..." : value ? "REPLACE FILE" : "UPLOAD FILE"}
            </button>

            {value?.url && (
              <span className="text-xs text-zinc-300 font-mono truncate max-w-[220px]">
                {value.url.split("/").pop()}
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-400">
            Supports PNG, JPG, WEBP. Transparent background recommended for portrait.
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {showUrlInput && (
        <div className="flex items-center gap-2 p-2.5 bg-zinc-900 border border-zinc-800 rounded">
          <input
            type="text"
            placeholder="e.g. /images/krishal-profile.png or https://..."
            value={customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value);
              handleApplyUrl(e.target.value);
            }}
            className="flex-1 bg-transparent text-xs text-zinc-200 font-mono outline-none placeholder:text-zinc-600 px-2 py-1 border border-zinc-800 focus:border-signal"
          />
          <button
            type="button"
            onClick={() => handleApplyUrl(customUrl)}
            className="px-3 py-1 bg-signal/20 hover:bg-signal/30 text-signal text-[10px] font-mono tracking-wider border border-signal/40 rounded transition-colors"
          >
            APPLY
          </button>
        </div>
      )}

      {error && <p className="mt-2 font-mono text-[10px] text-pink">{error}</p>}
    </div>
  );
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string), false);
    reader.readAsDataURL(file);
  });
}
