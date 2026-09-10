import { Github, Instagram, Facebook, Linkedin, ArrowUpRight, LucideIcon } from "lucide-react";
import { socialCards as defaultSocialCards } from "@/lib/data";
import Reveal from "./Reveal";

const icons: Record<string, LucideIcon> = { github: Github, instagram: Instagram, facebook: Facebook, linkedin: Linkedin };

type SocialCard = { key: string; label: string; tagline: string; handle: string; url: string; cta: string };

export default function SocialLinks({
  socialCards = defaultSocialCards,
}: {
  socialCards?: SocialCard[];
} = {}) {
  return (
    <section className="py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-signal">06 — CONNECT</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">Find me online.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {socialCards.map((card, i) => {
            const Icon = icons[card.key];
            const isPlaceholder = card.url.startsWith("[");
            return (
              <Reveal key={card.key} delay={i * 60}>
                <a
                  href={isPlaceholder ? undefined : card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className={`glass-panel p-7 h-full min-h-[190px] flex flex-col justify-between ${
                    isPlaceholder ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  <Icon size={20} className="text-signal" />
                  <div>
                    <h3 className="font-display text-lg uppercase text-paper">{card.label}</h3>
                    <p className="mt-1 text-sm text-paper-dim">{card.tagline}</p>
                    {card.handle && (
                      <p className="mt-2 font-mono text-xs text-paper-dim">{card.handle}</p>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest2 text-signal">
                    {isPlaceholder ? card.url : card.cta} <ArrowUpRight size={12} />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
