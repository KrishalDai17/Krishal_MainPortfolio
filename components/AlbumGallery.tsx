"use client";

import { useState } from "react";
import { Camera, X, MapPin, Calendar } from "lucide-react";
import { PhotoItem } from "@/lib/data";

export default function AlbumGallery({ photos }: { photos: PhotoItem[] }) {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  if (photos.length === 0) {
    return (
      <div className="border border-line p-12 text-center text-paper-dim font-mono text-sm bg-paper/5">
        No photos uploaded to this album yet. Photos can be added via the Admin CMS.
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            data-cursor="ZOOM"
            className="group relative w-full mb-6 break-inside-avoid border border-line hover:border-pink transition-all text-left overflow-hidden block bg-ink-soft"
          >
            <div
              className={`relative w-full overflow-hidden ${
                i % 3 === 0
                  ? "aspect-[4/5]"
                  : i % 3 === 1
                  ? "aspect-square"
                  : "aspect-[3/4]"
              }`}
            >
              {photo.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.imageUrl}
                  alt={photo.altText || photo.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-paper/5 text-paper-dim">
                  <Camera size={24} />
                  <span className="font-mono text-xs">{photo.title}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="font-mono text-[9px] tracking-widest2 text-pink font-semibold">
                  {photo.category}
                </span>
                <h4 className="font-display text-base text-paper uppercase mt-1">
                  {photo.title}
                </h4>
                {photo.location && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-paper-dim mt-1">
                    <MapPin size={10} /> {photo.location}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[95] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 text-paper border border-line hover:border-pink hover:text-pink transition-colors"
            onClick={() => setActivePhoto(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div
            className="hud-frame max-w-4xl max-h-[90vh] border border-line bg-ink flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 min-h-[300px] md:min-h-[500px] bg-black flex items-center justify-center">
              {activePhoto.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.altText || activePhoto.title}
                  className="max-h-[85vh] w-full object-contain"
                />
              ) : (
                <Camera size={48} className="text-paper-dim/40" />
              )}
            </div>

            <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-line bg-ink-soft">
              <div>
                <span className="font-mono text-[10px] tracking-widest2 text-pink font-semibold">
                  {activePhoto.category}
                </span>
                <h3 className="font-display text-xl uppercase text-paper mt-2">
                  {activePhoto.title}
                </h3>
                {activePhoto.description && (
                  <p className="mt-3 text-xs text-paper-dim leading-relaxed">
                    {activePhoto.description}
                  </p>
                )}

                <div className="mt-6 space-y-2.5 border-t border-line/50 pt-4 font-mono text-[11px] text-paper-dim">
                  {activePhoto.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-pink" />
                      <span>{activePhoto.location}</span>
                    </div>
                  )}
                  {activePhoto.dateTaken && (
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-pink" />
                      <span>Captured in {activePhoto.dateTaken}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-line flex items-center justify-between">
                <span className="font-mono text-[10px] text-paper-dim">
                  KRISHAL SHRESTHA
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="font-mono text-[10px] text-pink hover:underline"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
