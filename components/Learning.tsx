import { currentLearning as defaultLearning, LearningStage } from "@/lib/data";
import Reveal from "./Reveal";

const stageColor: Record<LearningStage, string> = {
  EXPLORING: "text-paper-dim",
  LEARNING: "text-ember",
  BUILDING: "text-signal",
};

export default function Learning({
  currentLearning = defaultLearning,
}: {
  currentLearning?: { name: string; stage: LearningStage }[];
} = {}) {
  return (
    <section className="py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-signal">09 — LEARNING</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Always building. Always learning.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {currentLearning.map((item, i) => (
            <Reveal key={item.name} delay={i * 60}>
              <div className="glass-panel p-7 h-full flex items-center justify-between">
                <span className="font-display text-base md:text-lg uppercase text-paper">{item.name}</span>
                <span className={`font-mono text-[10px] tracking-widest2 ${stageColor[item.stage]}`}>
                  {item.stage}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
