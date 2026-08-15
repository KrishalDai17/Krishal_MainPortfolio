import { education as defaultEducation } from "@/lib/data";
import Reveal from "./Reveal";

type EducationItem = { period: string; institution: string; program: string; location: string };

export default function Education({
  education = defaultEducation,
}: {
  education?: EducationItem[];
} = {}) {
  return (
    <section id="education" className="section-glow glow-blue-violet py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-signal">08 — EDUCATION</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">Timeline.</h2>
        </Reveal>

        <div className="mt-14 border-t border-line">
          {education.map((edu, i) => (
            <Reveal key={edu.institution} delay={i * 90}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 border-b border-line items-start">
                <span className="md:col-span-3 font-mono text-sm tracking-widest2 text-signal">
                  {edu.period}
                </span>
                <div className="md:col-span-6">
                  <h3 className="font-display text-xl md:text-2xl uppercase text-paper">
                    {edu.institution}
                  </h3>
                  <p className="mt-1 text-paper-dim">{edu.program}</p>
                </div>
                <span className="md:col-span-3 font-mono text-xs text-paper-dim md:text-right">
                  {edu.location}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
