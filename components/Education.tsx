import { education as defaultEducation, EducationItem } from "@/lib/data";
import Reveal from "./Reveal";
import { GraduationCap } from "lucide-react";

export default function Education({
  education = defaultEducation,
}: {
  education?: EducationItem[];
} = {}) {
  return (
    <section
      id="education"
      className="section-glow glow-blue-violet py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest2 text-signal">
            <GraduationCap size={14} />
            <span>05 — EDUCATION</span>
          </div>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Education.
          </h2>
          <p className="mt-3 text-paper-dim max-w-xl text-base">
            Formal computer engineering education and analytical scientific background.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-line">
          {education.map((edu, i) => (
            <Reveal key={edu.institution} delay={i * 90}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 border-b border-line items-start">
                <div className="md:col-span-3">
                  <span className="font-mono text-sm tracking-widest2 text-signal block">
                    {edu.period}
                  </span>
                  <span className="font-mono text-xs text-paper-dim mt-1 block">
                    {edu.location}
                  </span>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl uppercase text-paper">
                    {edu.institution}
                  </h3>
                  <p className="mt-1 text-base text-paper-dim font-medium">
                    {edu.program}
                  </p>
                  {edu.description && (
                    <p className="mt-3 text-sm text-paper-dim/80 leading-relaxed max-w-2xl">
                      {edu.description}
                    </p>
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
