import { experience as defaultExperience, ExperienceItem } from "@/lib/data";
import Reveal from "./Reveal";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience({
  experience = defaultExperience,
}: {
  experience?: ExperienceItem[];
} = {}) {
  return (
    <section
      id="experience"
      className="section-glow glow-blue-violet py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest2 text-signal">
            <Briefcase size={14} />
            <span>06 — PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Career Timeline.
          </h2>
          <p className="mt-3 text-paper-dim max-w-xl text-base">
            Professional milestones in software development, software quality assurance, and digital operations.
          </p>
        </Reveal>

        <div className="mt-16 space-y-12 relative border-l border-line/60 ml-3 pl-8 md:pl-10">
          {experience.map((item, i) => (
            <Reveal key={item.company + item.position} delay={i * 80}>
              <div className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-[41px] md:-left-[49px] top-1.5 h-4 w-4 rounded-full bg-ink border-2 border-signal flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal group-hover:scale-125 transition-transform" />
                </span>

                <div className="glass-panel p-8 border border-line hover:border-signal/80 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-4">
                    <div>
                      <span className="font-mono text-xs text-signal tracking-widest2">
                        {item.company.toUpperCase()}
                      </span>
                      <h3 className="font-display text-2xl uppercase text-paper mt-1">
                        {item.position}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-paper-dim bg-paper/5 px-3 py-1 border border-line w-fit">
                      <Calendar size={13} className="text-signal" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-paper-dim leading-relaxed">
                    {item.description}
                  </p>

                  {/* Responsibilities list */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-2">
                        KEY RESPONSIBILITIES
                      </span>
                      {item.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-paper">
                          <span className="text-signal font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{resp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-line/40 flex flex-wrap gap-2">
                      {item.technologies.map((t) => (
                        <span
                          key={t}
                          className="border border-line bg-ink/50 px-2.5 py-1 font-mono text-[10px] text-paper-dim"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
