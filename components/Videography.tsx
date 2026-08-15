"use client";

import { Play, Film } from "lucide-react";
import { videoItems as defaultVideoItems, VideoItem } from "@/lib/data";
import Reveal from "./Reveal";

export default function Videography({
  videoItems = defaultVideoItems,
}: {
  videoItems?: VideoItem[];
} = {}) {
  return (
    <section id="videography" className="section-glow glow-orange-pink py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-orange">07 — VIDEOGRAPHY</span>
          <h2 className="mt-4 font-editorial text-display-lg uppercase text-paper">Motion. Story. Frame.</h2>
          <p className="mt-4 font-serif italic text-pink text-xl md:text-2xl max-w-xl">
            Photography freezes a moment. Videography gives it movement.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videoItems.map((video, i) => (
            <Reveal key={video.id} delay={i * 70}>
              <button
                data-cursor="VIEW"
                onClick={() => video.videoUrl && window.open(video.videoUrl, "_blank", "noopener,noreferrer")}
                className="group relative w-full aspect-video border border-line hover:border-orange transition-colors overflow-hidden text-left"
              >
                <div className="absolute inset-0 bg-ink-soft flex items-center justify-center overflow-hidden">
                  {video.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover" />
                  ) : (
                    <Film size={22} className="text-paper-dim/50" />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-14 w-14 rounded-full border border-paper/40 flex items-center justify-center group-hover:border-orange group-hover:bg-orange/10 transition-colors">
                    <Play size={18} className="text-paper ml-0.5" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/90 to-transparent">
                  <span className="font-mono text-[9px] tracking-widest2 text-orange">{video.category}</span>
                  <h3 className="font-display text-sm uppercase text-paper mt-1">{video.title}</h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
