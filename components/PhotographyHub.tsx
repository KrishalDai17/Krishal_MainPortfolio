"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, X, MapPin, Calendar, ArrowUpRight, FolderHeart } from "lucide-react";
import { PhotoItem, PhotographyAlbum, photoCategories } from "@/lib/data";

export default function PhotographyHub({
  albums,
  photos,
}: {
  albums: PhotographyAlbum[];
  photos: PhotoItem[];
}) {
  const [filter, setFilter] = useState("ALL");
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const visiblePhotos = photos.filter((p) => {
    if (filter === "ALL") return true;
    return p.category.toUpperCase() === filter;
  });

  return (
    <div className="space-y-20">
      {/* SECTION 1: PHOTOGRAPHY ALBUMS */}
      <section>
        <div className="flex items-center gap-2 font-mono text-xs text-pink tracking-widest2 mb-2">
          <FolderHeart size={14} /> CURATED ALBUMS & PROJECTS
        </div>
        <h2 className="font-display text-3xl md:text-4xl uppercase text-paper">
          Photo Collections
        </h2>
        <p className="mt-2 text-paper-dim text-sm max-w-xl">
          Thematic visual narratives captured across Nepal, ranging from heritage street scenes to portraits and highland landscapes.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <Link
              key={album.slug}
              href={`/photography/${album.slug}`}
              className="glass-panel group overflow-hidden border border-line hover:border-pink transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-soft border-b border-line">
                  {album.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={album.coverImageUrl}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-paper/5 text-paper-dim">
                      <Camera size={32} />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-ink/80 backdrop-blur-md px-2.5 py-1 border border-line font-mono text-[9px] tracking-widest2 text-pink">
                    {album.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl uppercase text-paper group-hover:text-pink transition-colors">
                    {album.title}
                  </h3>
                  <p className="mt-2 text-xs text-paper-dim line-clamp-2 leading-relaxed">
                    {album.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-line/40 mt-3 flex items-center justify-between font-mono text-[10px] text-paper-dim">
                <span>VIEW ALBUM</span>
                <span className="flex items-center gap-1 group-hover:text-pink transition-colors">
                  OPEN <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 2: COMPLETE GALLERY WITH CATEGORY FILTERS */}
      <section className="border-t border-line pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-xs text-pink tracking-widest2 block mb-2">
              ALL FRAMES
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-paper">
              Master Gallery
            </h2>
            <p className="text-paper-dim text-sm mt-1 max-w-xl">
              Filter photographs by discipline. Click any photograph to view high-resolution details in the lightbox.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {photoCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 font-mono text-[10px] tracking-widest2 border transition-all ${
                  filter === cat
                    ? "bg-pink border-pink text-white"
                    : "border-line text-paper-dim hover:border-pink hover:text-paper bg-paper/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {visiblePhotos.map((photo, i) => (
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
      </section>

      {/* LIGHTBOX MODAL (NO UGLY FILENAMES!) */}
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
            {/* Visual */}
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

            {/* Sidebar with pristine editorial metadata */}
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
                  {activePhoto.albumSlug && (
                    <div className="flex items-center gap-2 text-paper">
                      <FolderHeart size={12} className="text-pink" />
                      <Link
                        href={`/photography/${activePhoto.albumSlug}`}
                        className="hover:underline text-pink"
                        onClick={() => setActivePhoto(null)}
                      >
                        Part of Album →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-line flex items-center justify-between">
                <span className="font-mono text-[10px] text-paper-dim">
                  BY KRISHAL SHRESTHA
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
    </div>
  );
}
