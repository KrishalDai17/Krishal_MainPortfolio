import { dataCapabilities as defaultCapabilities, dataFlow as defaultFlow } from "@/lib/data";
import Reveal from "./Reveal";

export default function DataSection({
  dataCapabilities = defaultCapabilities,
  dataFlow = defaultFlow,
}: {
  dataCapabilities?: string[];
  dataFlow?: string[];
} = {}) {
  return (
    <section className="section-glow glow-cyan py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-14">
        <Reveal className="lg:col-span-5">
          <span className="font-mono text-[11px] tracking-widest2 text-cyan">05 — DATA</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Precision behind the data.
          </h2>
          <p className="mt-6 text-paper-dim leading-relaxed max-w-md">
            Technology is not only about writing code. It is also about managing information
            accurately.
          </p>

          <div className="mt-10 font-mono text-xs tracking-widest2 text-paper-dim">
            {dataFlow.map((step, i) => (
              <div key={step} className="flex items-center gap-4 py-3 border-b border-line">
                <span className="text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-paper">{step}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-line">
            {dataCapabilities.map((cap) => (
              <div
                key={cap}
                className="glass-panel p-6 min-h-[110px] flex items-end"
              >
                <span className="font-display text-sm md:text-base uppercase text-paper leading-tight">
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
