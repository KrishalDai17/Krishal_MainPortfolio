"use client";

import { useState } from "react";
import {
  qaWorkflow as defaultWorkflow,
  qaCards as defaultCards,
  qaTools as defaultTools,
  qaProjects as defaultQAProjects,
  QAProject,
} from "@/lib/data";
import Reveal from "./Reveal";
import { CheckCircle2, ShieldCheck, Bug, Database, Globe, ArrowRight } from "lucide-react";

export default function QASection({
  qaWorkflow = defaultWorkflow,
  qaCards = defaultCards,
  qaTools = defaultTools,
  qaProjects = defaultQAProjects,
}: {
  qaWorkflow?: string[];
  qaCards?: string[];
  qaTools?: string[];
  qaProjects?: QAProject[];
} = {}) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const activeQA = qaProjects[selectedProjectIndex] || qaProjects[0];

  return (
    <section
      id="qa"
      className="section-glow glow-lime-cyan py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest2 text-lime">
            <ShieldCheck size={14} />
            <span>04 — QUALITY ASSURANCE & VERIFICATION</span>
          </div>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Behind every dependable product.
          </h2>
          <p className="mt-3 text-paper-dim max-w-2xl text-base md:text-lg leading-relaxed">
            Software quality is more than catching bugs. It involves verifying business requirements, architecting test plans, checking payload contracts with Postman, validating relational databases, and delivering defect-free releases.
          </p>
        </Reveal>

        {/* WORKFLOW & METHODOLOGY */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Interactive Workflow Pipeline */}
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-6">
              END-TO-END QA WORKFLOW
            </span>
            <div className="space-y-0 relative border-l border-line/60 ml-3 pl-6">
              {qaWorkflow.map((step, i) => (
                <div key={step} className="relative pb-6 last:pb-0 group">
                  <span className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-ink border border-lime flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime group-hover:scale-125 transition-transform" />
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-paper group-hover:text-lime transition-colors">
                      {step}
                    </span>
                    <span className="font-mono text-[9px] text-paper-dim/60">
                      STEP 0{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Testing Focus Cards & Tools */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-4">
                CORE TESTING SPECIALIZATIONS
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-line border border-line rounded-sm overflow-hidden">
                {qaCards.map((card, i) => (
                  <Reveal key={card} delay={i * 30} direction="scale">
                    <div className="bg-ink p-5 h-full min-h-[90px] flex items-end hover:bg-ink-soft group transition-all duration-200 cursor-default">
                      <span className="font-display text-sm uppercase text-paper leading-tight group-hover:text-lime transition-colors">
                        {card}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-3">
                QA TOOLKIT & TESTING STACK
              </span>
              <div className="flex flex-wrap gap-2.5">
                {qaTools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-line bg-paper/5 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-paper hover:border-lime hover:text-lime hover:scale-105 active:scale-95 transition-all duration-200 rounded-sm cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* QA PROJECT SHOWCASE & REPORT DOSSIER */}
        {qaProjects.length > 0 && activeQA && (
          <div className="mt-24 border-t border-line pt-16">
            <Reveal>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div>
                  <span className="font-mono text-xs text-lime tracking-widest2 block mb-1">
                    VERIFICATION CASE STUDIES
                  </span>
                  <h3 className="font-display text-3xl uppercase text-paper">
                    QA Test Reports Showcase
                  </h3>
                </div>

                {/* Project Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {qaProjects.map((q, idx) => (
                    <button
                      key={q.title}
                      onClick={() => setSelectedProjectIndex(idx)}
                      className={`px-4 py-2 font-mono text-xs tracking-wider border transition-all ${
                        selectedProjectIndex === idx
                          ? "bg-lime text-ink border-lime font-semibold"
                          : "border-line text-paper-dim hover:border-lime hover:text-paper bg-paper/5"
                      }`}
                    >
                      {q.project}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Active QA Report Card */}
            <div className="glass-panel p-8 md:p-10 border border-line space-y-8 animate-fade-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line/60 pb-6">
                <div>
                  <span className="bg-lime/15 text-lime px-3 py-1 border border-lime/30 font-mono text-[10px] tracking-widest2">
                    {activeQA.testingType}
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl uppercase text-paper mt-3">
                    {activeQA.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeQA.tools.map((t) => (
                    <span
                      key={t}
                      className="border border-line bg-ink/60 px-2.5 py-1 font-mono text-[10px] text-paper-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* QA Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Test Cases Design */}
                <div className="space-y-2 border border-line/50 p-5 bg-paper/5">
                  <div className="flex items-center gap-2 font-mono text-xs text-lime">
                    <CheckCircle2 size={15} /> TEST CASE DESIGN & COVERAGE
                  </div>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {activeQA.testCases}
                  </p>
                </div>

                {/* Bug Reports */}
                <div className="space-y-2 border border-line/50 p-5 bg-paper/5">
                  <div className="flex items-center gap-2 font-mono text-xs text-ember">
                    <Bug size={15} /> BUG REPORTING & DEFECT TRACKING
                  </div>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {activeQA.bugReports}
                  </p>
                </div>

                {/* API Testing */}
                <div className="space-y-2 border border-line/50 p-5 bg-paper/5">
                  <div className="flex items-center gap-2 font-mono text-xs text-signal">
                    <Globe size={15} /> API & INTEGRATION VALIDATION
                  </div>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {activeQA.apiTesting}
                  </p>
                </div>

                {/* Database Testing */}
                <div className="space-y-2 border border-line/50 p-5 bg-paper/5">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan">
                    <Database size={15} /> DATABASE INTEGRITY VALIDATION
                  </div>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {activeQA.databaseTesting}
                  </p>
                </div>
              </div>

              {/* Quality Outcome Box */}
              <div className="border border-lime/40 bg-lime/5 p-5 flex items-start gap-3">
                <ShieldCheck size={20} className="text-lime shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] tracking-widest2 text-lime block mb-1">
                    VERIFIED OUTCOME
                  </span>
                  <p className="text-sm text-paper font-medium leading-relaxed">
                    {activeQA.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
