"use client";

import { useState } from "react";
import {
  skillCategories as defaultCategories,
  SkillCategory,
  SkillLevel,
} from "@/lib/data";
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
  const [active, setActive] = useState(skillCategories[0]?.id || "programming");
  const category =
    skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <section
      id="skills"
      className="section-glow glow-cyan-blue py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-cyan">
            02 — SKILLS & CAPABILITIES
          </span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Technical Matrix.
          </h2>
          <p className="mt-3 text-paper-dim max-w-xl text-base">
            Languages, frameworks, testing tools, database systems, and creative tools I apply across engineering lifecycles.
          </p>
        </Reveal>

        {/* Category Tabs */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-6">
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`px-4 py-2.5 font-mono text-[11px] tracking-widest2 border transition-all ${
                  active === c.id
                    ? "bg-signal border-signal text-white shadow-md shadow-signal/20"
                    : "border-line text-paper-dim hover:border-signal/60 hover:text-paper bg-paper/5"
                }`}
              >
                {c.tab}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active Category Display */}
        {category && (
          <div
            key={active}
            className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-up"
          >
            <div className="lg:col-span-4">
              <span className="font-mono text-xs text-signal font-semibold">
                {category.index}
              </span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl uppercase text-paper">
                {category.title}
              </h3>
              <p className="mt-3 text-sm text-paper-dim leading-relaxed">
                Applied in production environments, academic research projects, and full-stack software development.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {category.groups.map((group) => (
                <div key={group.label} className="border border-line/60 p-6 bg-paper/5">
                  <h4 className="font-mono text-[11px] tracking-widest2 text-paper-dim mb-4 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-signal" />
                    {group.label.toUpperCase()}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item.name}
                        title={item.level}
                        className="group inline-flex items-center gap-2 border border-line bg-ink/60 px-3.5 py-2 font-mono text-xs text-paper hover:border-signal transition-colors"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${levelDot[item.level]}`}
                        />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-widest2 text-paper-dim border-t border-line/50 pt-6">
          {(Object.keys(levelDot) as SkillLevel[]).map((level) => (
            <span key={level} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${levelDot[level]}`} /> {level}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
