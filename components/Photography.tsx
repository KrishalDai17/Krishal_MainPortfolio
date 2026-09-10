"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, X, ArrowUpRight, MapPin, Calendar, Compass } from "lucide-react";
import {
  photoCategories,
  photoItems as defaultPhotoItems,
  profile as defaultProfile,
  PhotoItem,
} from "@/lib/data";
import Reveal from "./Reveal";

export default function Photography({
  photoItems = defaultPhotoItems,
  profile = defaultProfile,
}: {
  photoItems?: PhotoItem[];
  profile?: typeof defaultProfile;
} = {}) {
  const [filter, setFilter] = useState("ALL");
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Show featured photos or filtered
  const featuredOnly = photoItems.filter((p) => p.featured !== false);
  const visible = (filter === "ALL" ? featuredOnly : photoItems).filter((p) =>
    filter === "ALL" ? true : p.category.toUpperCase() === filter
  );

  return (
    <section
      id="photography"
      className="section-glow glow-pink-orange py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="font-mono text-[11px] tracking-widest2 text-pink">
                04 — PHOTOGRAPHY
              </span>
              <h2 className="mt-3 font-editorial text-display-lg uppercase text-paper">
                Through My Lens.
              </h2>
              <p className="mt-3 font-serif italic text-orange text-xl md:text-2xl max-w-xl">
                Technology solves problems. Creativity gives them meaning.
              </p>
            </div>

            <Link
              href="/photography"
              className="inline-flex items-center gap-2 border border-line bg-paper/5 px-6 py-3 font-mono text-xs text-paper hover:border-pink hover:text-pink transition-colors"
            >
              VIEW ALL PHOTOGRAPHY <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-6">
            {photoCategories.slice(0, 6).map((cat) => (
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
        </Reveal>

        {/* Masonry / Grid Gallery */}
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {visible.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              data-cursor="VIEW"
              className="group relative w-full mb-6 break-inside-avoid border border-line rounded-sm hover:border-pink hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-8px_rgba(236,72,153,0.22)] transition-all duration-300 text-left overflow-hidden block bg-ink-soft/50"
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
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
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

        {/* Creative Section Teaser */}
        <Reveal delay={100}>
          <div className="mt-16 border border-line bg-paper/5 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-pink tracking-widest2 block mb-1">
                DISCIPLINE OVERVIEW
              </span>
              <h3 className="font-display text-2xl uppercase text-paper">
                Visual Perspectives & Photographic Albums
              </h3>
              <p className="mt-2 text-paper-dim max-w-xl text-sm leading-relaxed">
                Explore dedicated collections: Kathmandu street photography, portrait collections, festival coverage, and natural Himalayan landscapes.
              </p>
            </div>
            <Link
              href="/photography"
              className="shrink-0 inline-flex items-center gap-2 bg-pink hover:bg-pink/90 text-white px-7 py-3.5 font-mono text-xs tracking-widest2 transition-colors shadow-lg shadow-pink/20"
            >
              <Compass size={14} /> EXPLORE PHOTO ALBUMS
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal with Clean Metadata */}
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
            {/* Photo Visual */}
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

            {/* Metadata Sidebar (no ugly file names!) */}
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

                <div className="mt-6 space-y-2 border-t border-line/50 pt-4 font-mono text-[11px] text-paper-dim">
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
    </section>
  );
}
