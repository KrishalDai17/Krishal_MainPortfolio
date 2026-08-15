"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

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

  const upload = async (file: File) => {
    setLoading(true);
    setError("");
    try {
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "krishal-portfolio" }),
      });
      if (!signRes.ok) throw new Error("Could not get upload signature.");
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
      if (!uploadRes.ok) throw new Error("Upload to Cloudinary failed.");
      const data = await uploadRes.json();
      onChange({ url: data.secure_url, publicId: data.public_id });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-2">{label}</span>
      <div className="flex items-center gap-4">
        {value?.url ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-1 right-1 bg-ink/80 p-0.5 text-paper hover:text-pink"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="h-20 w-20 shrink-0 border border-dashed border-line flex items-center justify-center text-paper-dim/50">
            <UploadCloud size={20} />
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[10px] tracking-widest2 text-paper hover:border-signal transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
          {loading ? "UPLOADING..." : value ? "REPLACE" : "UPLOAD"}
        </button>
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
      {error && <p className="mt-2 font-mono text-[10px] text-pink">{error}</p>}
    </div>
  );
}
