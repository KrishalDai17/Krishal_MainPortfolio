"use client";

import { useState } from "react";
import { skillCategories as defaultCategories, SkillCategory, SkillLevel } from "@/lib/data";
import Reveal from "./Reveal";

const levelDot: Record<SkillLevel, string> = {
  "PRACTICAL EXPERIENCE": "bg-signal",
  "WORKING KNOWLEDGE": "bg-signal-soft",
  FAMILIAR: "bg-paper-dim",
  "CURRENTLY LEARNING": "bg-ember",
};

export default function SkillMatrix({
  skillCategories = defaultCategories,
}: {
  skillCategories?: SkillCategory[];
} = {}) {
  const [active, setActive] = useState(skillCategories[0]?.id);
  const category = skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <section id="skills" className="section-glow glow-cyan-blue py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-cyan">02 — SKILLS</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">Capability matrix.</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-6">
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`px-4 py-2.5 font-mono text-[11px] tracking-widest2 border transition-colors ${
                  active === c.id
                    ? "bg-cyan border-cyan text-ink"
                    : "border-line text-paper-dim hover:border-cyan hover:text-paper"
                }`}
              >
                {c.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={active} className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-up">
          <div className="lg:col-span-3">
            <span className="font-mono text-[11px] text-cyan">{category.index}</span>
            <h3 className="mt-2 font-display text-2xl md:text-3xl uppercase text-paper">{category.title}</h3>
          </div>

          <div className="lg:col-span-9 space-y-8">
            {category.groups.map((group) => (
              <div key={group.label}>
                <h4 className="font-mono text-[10px] tracking-widest2 text-paper-dim mb-3">
                  {group.label.toUpperCase()}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      title={item.level}
                      className="group inline-flex items-center gap-2 border border-line px-3 py-2 font-mono text-[11px] text-paper hover:border-signal transition-colors"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${levelDot[item.level]}`} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-widest2 text-paper-dim">
          {(Object.keys(levelDot) as SkillLevel[]).map((level) => (
            <span key={level} className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${levelDot[level]}`} /> {level}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
