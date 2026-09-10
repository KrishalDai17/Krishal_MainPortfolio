import Image from "next/image";
import {
  Code,
  CheckCircle2,
  Database,
  Camera,
  Layers,
  Sparkles,
  MapPin,
} from "lucide-react";
import {
  profile as defaultProfile,
  aboutIntro as defaultIntro,
  careerSummary as defaultCareerSummary,
  aboutHighlights as defaultHighlights,
  whatIDoItems as defaultWhatIDo,
  identityCards as defaultCards,
  WhatIDoItem,
} from "@/lib/data";
import Reveal from "./Reveal";

const iconMap: Record<string, any> = {
  ENGINEERING: Code,
  QUALITY: CheckCircle2,
  DATA: Database,
  CREATIVE: Camera,
  DESIGN: Layers,
};

export default function About({
  profile = defaultProfile,
  aboutIntro = defaultIntro,
  careerSummary = defaultCareerSummary,
  highlights = defaultHighlights,
  whatIDo = defaultWhatIDo,
  identityCards = defaultCards,
}: {
  profile?: typeof defaultProfile;
  aboutIntro?: string[];
  careerSummary?: string;
  highlights?: string[];
  whatIDo?: WhatIDoItem[];
  identityCards?: typeof defaultCards;
} = {}) {
  return (
    <section
      id="about"
      className="section-glow glow-violet-cyan relative py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest2 text-cyan">
            <Sparkles size={13} />
            <span>01 — ABOUT & PROFILE</span>
          </div>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper max-w-3xl">
            Engineer by logic.
            <br />
            <span className="text-paper-dim">Problem solver by practice.</span>
          </h2>
        </Reveal>

        {/* Two-column layout: Left Portrait, Right About Me */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Portrait Photo & Status */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="left">
              <div className="hud-frame relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden border border-line bg-ink-soft group rounded-sm transition-all duration-300 hover:border-signal/80 hover:shadow-[0_16px_36px_-8px_rgba(79,124,255,0.22)]">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-paper/5 font-mono text-xs text-paper-dim">
                    {profile.name}
                  </div>
                )}
                {/* Overlay vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />

                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest2 text-paper">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-signal" /> {profile.location.toUpperCase()}
                  </span>
                  <span className="text-lime font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
                    ONLINE
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Quick Profile Meta */}
            <Reveal delay={100} direction="left">
              <div className="glass-panel p-5 border border-line rounded-sm space-y-3 font-mono text-xs max-w-md mx-auto lg:mx-0 hover:border-signal/40 transition-colors">
                <div className="flex justify-between border-b border-line/50 pb-2">
                  <span className="text-paper-dim">NAME</span>
                  <span className="text-paper">{profile.name}</span>
                </div>
                <div className="flex justify-between border-b border-line/50 pb-2">
                  <span className="text-paper-dim">FOCUS</span>
                  <span className="text-paper">Software Engineering & QA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-paper-dim">CREATIVE</span>
                  <span className="text-paper">Photography & Storytelling</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: About Me Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Career Summary Callout */}
            <Reveal delay={80} direction="right">
              <div className="border-l-2 border-signal pl-6 py-1">
                <p className="font-display text-xl md:text-2xl text-paper leading-snug">
                  {careerSummary}
                </p>
              </div>
            </Reveal>

            {/* Intro Paragraphs */}
            <div className="space-y-4">
              {aboutIntro.map((p, i) => (
                <Reveal key={i} delay={140 + i * 60} direction="right">
                  <p className="text-paper-dim leading-relaxed text-base md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Highlights Badges */}
            <Reveal delay={280} direction="up">
              <div>
                <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-3">
                  CORE HIGHLIGHTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="border border-line bg-paper/5 px-3 py-1.5 font-mono text-[11px] tracking-wider text-paper hover:border-signal hover:text-signal hover:scale-105 transition-all duration-200 rounded-sm"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* "What I Do" Section */}
        <div className="mt-24 border-t border-line pt-16">
          <Reveal direction="up">
            <span className="font-mono text-[11px] tracking-widest2 text-cyan block mb-2">
              DISCIPLINES
            </span>
            <h3 className="font-display text-3xl uppercase text-paper">What I Do.</h3>
            <p className="mt-2 text-paper-dim max-w-xl text-sm">
              Combining technical rigor with visual clarity to engineer dependable digital products.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatIDo.map((item, i) => {
              const IconComp = iconMap[item.category] || Code;
              return (
                <Reveal key={item.title} delay={i * 80} direction="up">
                  <div className="glass-panel p-7 h-full flex flex-col justify-between group border border-line rounded-sm hover:border-signal/80 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_rgba(79,124,255,0.18)] transition-all duration-300 bg-ink-soft/30 backdrop-blur-sm">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 border border-line text-signal bg-paper/5 rounded-sm group-hover:border-signal group-hover:bg-signal/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <IconComp size={18} />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest2 text-paper-dim group-hover:text-signal transition-colors">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-display text-xl uppercase text-paper group-hover:text-signal transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-sm text-paper-dim leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Identity Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {identityCards.map((card, i) => (
            <Reveal key={card.index} delay={i * 60}>
              <div className="bg-ink p-6 h-full flex flex-col justify-between min-h-[160px] group hover:bg-ink-soft transition-colors">
                <span className="font-mono text-[11px] tracking-widest2 text-signal">
                  {card.index}
                </span>
                <div className="mt-6">
                  <h4 className="font-display text-lg uppercase text-paper">{card.title}</h4>
                  <p className="mt-1.5 text-xs text-paper-dim leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
