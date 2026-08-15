import { contributions as defaultContributions } from "@/lib/data";
import Reveal from "./Reveal";

type Contribution = { title: string; description: string };

export default function ProfessionalProfile({
  contributions = defaultContributions,
}: {
  contributions?: Contribution[];
} = {}) {
  return (
    <section className="py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-signal">10 — PROFILE</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            What I can contribute.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {contributions.map((c, i) => (
            <Reveal key={c.title} delay={i * 50}>
              <div className="glass-panel p-7 h-full min-h-[160px] flex flex-col justify-between">
                <span className="font-mono text-[10px] tracking-widest2 text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-base uppercase text-paper">{c.title}</h3>
                  <p className="mt-2 text-sm text-paper-dim leading-relaxed">{c.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
