import { aboutIntro as defaultIntro, identityCards as defaultCards } from "@/lib/data";
import Reveal from "./Reveal";

export default function About({
  aboutIntro = defaultIntro,
  identityCards = defaultCards,
}: {
  aboutIntro?: string[];
  identityCards?: typeof defaultCards;
} = {}) {
  return (
    <section id="about" className="section-glow glow-violet-cyan relative py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-signal">01 — ABOUT</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper max-w-3xl">
            More than a<br />developer.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-5">
            {aboutIntro.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-paper-dim leading-relaxed text-base md:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line">
            {identityCards.map((card, i) => (
              <Reveal key={card.index} delay={i * 90}>
                <div className="glass-panel p-7 h-full flex flex-col justify-between min-h-[180px] group">
                  <span className="font-mono text-[11px] tracking-widest2 text-signal">{card.index}</span>
                  <div>
                    <h3 className="font-display text-xl uppercase text-paper mt-6">{card.title}</h3>
                    <p className="mt-2 text-sm text-paper-dim leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
