import { qaWorkflow as defaultWorkflow, qaCards as defaultCards, qaTools as defaultTools } from "@/lib/data";
import Reveal from "./Reveal";

export default function QASection({
  qaWorkflow = defaultWorkflow,
  qaCards = defaultCards,
  qaTools = defaultTools,
}: {
  qaWorkflow?: string[];
  qaCards?: string[];
  qaTools?: string[];
} = {}) {
  return (
    <section id="qa" className="section-glow glow-lime-cyan py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-lime">04 — QA</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Behind every good product.
          </h2>
          <p className="mt-4 text-paper-dim max-w-xl italic">
            I don&apos;t only build software. I also try to break it.
          </p>
          <p className="mt-6 text-paper-dim max-w-2xl leading-relaxed">
            Software quality is more than finding bugs. It is about understanding requirements,
            validating behavior, checking data, testing APIs, and ensuring that the final product
            works as expected.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* Workflow */}
          <Reveal className="lg:col-span-4">
            <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-6">
              QA WORKFLOW
            </span>
            <div className="space-y-0">
              {qaWorkflow.map((step, i) => (
                <div key={step} className="relative pl-8 pb-7 last:pb-0">
                  {i !== qaWorkflow.length - 1 && (
                    <span className="absolute left-[5px] top-3 bottom-0 w-px bg-line" />
                  )}
                  <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-lime" />
                  <span className="font-mono text-xs tracking-widest2 text-paper">{step}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Test cards */}
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-6">
              TESTING FOCUS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-line">
              {qaCards.map((card, i) => (
                <Reveal key={card} delay={i * 40}>
                  <div className="glass-panel p-6 h-full min-h-[110px] flex items-end">
                    <span className="font-display text-sm md:text-base uppercase text-paper leading-tight">
                      {card}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-10">
                <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-4">
                  TOOLS
                </span>
                <div className="flex flex-wrap gap-3">
                  {qaTools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-line px-4 py-2 font-mono text-[11px] tracking-widest2 text-paper-dim hover:border-lime hover:text-paper transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
