"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Loader2, Link2 } from "lucide-react";

export interface UploadedImage {
  url: string;
  publicId: string;
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block">{label}</span>
        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          className="font-mono text-[10px] text-signal/80 hover:text-signal transition-colors flex items-center gap-1"
        >
          <Link2 size={11} />
          {showUrlInput ? "Hide Direct URL" : "Or enter URL / path"}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {value?.url ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-line rounded bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setCustomUrl("");
              }}
              className="absolute top-1 right-1 bg-ink/80 p-0.5 text-paper hover:text-pink rounded"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="h-20 w-20 shrink-0 border border-dashed border-line rounded flex items-center justify-center text-paper-dim/50">
            <UploadCloud size={20} />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[10px] tracking-widest2 text-paper hover:border-signal transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
              {loading ? "UPLOADING..." : value ? "REPLACE FILE" : "UPLOAD FILE"}
            </button>

            {value?.url && (
              <span className="text-[11px] text-zinc-400 font-mono truncate max-w-[220px]">
                {value.url.split("/").pop()}
              </span>
            )}
          </div>

          <p className="text-[11px] text-zinc-500">
            Supports PNG, JPG, WEBP. Transparent background recommended for portrait.
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = "";
          }}
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
