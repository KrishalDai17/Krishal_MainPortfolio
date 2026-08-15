"use client";

import { useState } from "react";
import { Camera, X, ArrowUpRight } from "lucide-react";
import { photoCategories, photoItems as defaultPhotoItems, profile as defaultProfile, PhotoItem } from "@/lib/data";
import Reveal from "./Reveal";

export default function Photography({
  photoItems = defaultPhotoItems,
  profile = defaultProfile,
}: {
  photoItems?: PhotoItem[];
  profile?: typeof defaultProfile;
} = {}) {
  const [filter, setFilter] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const visible = filter ? photoItems.filter((p) => p.category === filter) : photoItems;
  const activeItem = photoItems.find((p) => p.id === active);

  return (
    <section id="photography" className="section-glow glow-pink-orange py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-pink">06 — PHOTOGRAPHY</span>
          <h2 className="mt-4 font-editorial text-display-lg uppercase text-paper">Through my lens.</h2>
          <p className="mt-4 font-serif italic text-orange text-xl md:text-2xl max-w-xl">
            Technology explains how things work. Photography captures how they feel.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-3.5 py-2 font-mono text-[10px] tracking-widest2 border transition-colors ${
                filter === null ? "bg-pink border-pink text-paper" : "border-line text-paper-dim hover:border-pink"
              }`}
            >
              ALL
            </button>
            {photoCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 font-mono text-[10px] tracking-widest2 border transition-colors ${
                  filter === cat ? "bg-pink border-pink text-paper" : "border-line text-paper-dim hover:border-pink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {visible.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setActive(photo.id)}
              data-cursor="VIEW"
              className={`group relative w-full mb-4 break-inside-avoid border border-line hover:border-pink transition-colors text-left ${
                i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/4]"
              }`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-soft overflow-hidden">
                {photo.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.imageUrl}
                    alt={photo.altText || photo.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Camera size={20} className="text-paper-dim/60 group-hover:text-pink transition-colors" />
                    <span className="font-mono text-[9px] tracking-widest2 text-paper-dim/60">
                      {photo.title}
                    </span>
                  </>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-ink/80 to-transparent">
                <span className="font-mono text-[9px] tracking-widest2 text-paper">{photo.category}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Brand subsection */}
        <Reveal delay={100}>
          <div className="mt-20 border-t border-line pt-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="font-display text-2xl uppercase text-paper">Krishal through the lens</h3>
              <p className="mt-3 text-paper-dim leading-relaxed">
                Photography allows me to approach the world differently — looking for composition,
                light, timing and the small details that are easy to miss.
              </p>
              <span className="mt-3 inline-block font-mono text-xs text-pink">@only__krishal</span>
            </div>
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-6 py-3.5 font-mono text-[11px] tracking-widest2 text-paper hover:border-pink hover:text-pink transition-colors shrink-0"
            >
              VIEW INSTAGRAM <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[95] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-paper hover:text-signal transition-colors"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X size={26} />
          </button>
          <div
            className="hud-frame border border-line w-full max-w-2xl aspect-[4/5] flex flex-col items-center justify-center gap-3 bg-ink-soft overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeItem.imageUrl}
                alt={activeItem.altText || activeItem.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <Camera size={28} className="text-paper-dim/60" />
                <span className="font-mono text-xs tracking-widest2 text-paper-dim">{activeItem.title}</span>
                <span className="font-mono text-[10px] tracking-widest2 text-pink">{activeItem.category}</span>
                <span className="text-sm text-paper-dim mt-2">{activeItem.description}</span>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
