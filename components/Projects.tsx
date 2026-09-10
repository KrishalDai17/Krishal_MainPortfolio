"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, ArrowUpRight, ExternalLink, Code2 } from "lucide-react";
import { projects as defaultProjects, projectCategories, Project } from "@/lib/data";
import Reveal from "./Reveal";
export default function Projects({
  projects = defaultProjects,
}: {
  projects?: Project[];
} = {}) {
  const [filter, setFilter] = useState("ALL");

  const visibleProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    if (p.category?.toUpperCase() === filter) return true;
    if (p.technology?.some((t) => t.toUpperCase() === filter)) return true;
    return false;
  });

  return (
    <section
      id="projects"
      className="section-glow glow-blue-violet py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="font-mono text-[11px] tracking-widest2 text-signal">
                03 — FEATURED PROJECTS
              </span>
              <h2 className="mt-3 font-display text-display-lg uppercase text-paper">
                Engineered Works.
              </h2>
              <p className="mt-3 text-paper-dim max-w-xl text-base">
                Production-grade applications, database architectures, and cross-platform mobile solutions.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-xs text-paper hover:border-signal transition-colors"
            >
              VIEW ALL PROJECTS <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-6">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 font-mono text-[10px] tracking-widest2 border transition-all ${
                  filter === cat
                    ? "bg-signal border-signal text-white"
                    : "border-line text-paper-dim hover:border-signal/60 hover:text-paper bg-paper/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.slug || project.index} delay={i * 80} direction="up">
              <div className="glass-panel h-full flex flex-col justify-between border border-line rounded-sm transition-all duration-300 group overflow-hidden hover:-translate-y-2 hover:border-signal/80 hover:shadow-[0_16px_36px_-8px_rgba(79,124,255,0.22)] bg-ink-soft/40 backdrop-blur-sm">
                <div>
                  {/* Project Image Banner */}
                  <div className="relative aspect-video w-full overflow-hidden bg-ink-soft border-b border-line">
                    {project.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.coverImageUrl}
                        alt={project.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-paper/5 text-paper-dim">
                        <Code2 size={32} />
                      </div>
                    )}

                    {/* Smooth hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                    {/* Category & Status badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-ink/90 backdrop-blur-md px-2.5 py-1 border border-line font-mono text-[9px] tracking-widest2 text-signal rounded-sm shadow-sm">
                        {project.category}
                      </span>
                      <span className="bg-ink/90 backdrop-blur-md px-2.5 py-1 border border-line font-mono text-[9px] tracking-widest2 text-lime flex items-center gap-1.5 rounded-sm shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-xs text-signal font-semibold tracking-wider">
                        {project.index}
                      </span>
                    </div>

                    <h3 className="font-display text-xl uppercase text-paper transition-colors group-hover:text-signal line-clamp-1">
                      {project.name}
                    </h3>

                    <p className="mt-3 text-sm text-paper-dim leading-relaxed line-clamp-3">
                      {project.shortDescription || project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.technology.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="border border-line bg-paper/[0.03] px-2 py-0.5 font-mono text-[10px] text-paper-dim hover:text-paper hover:border-signal/40 transition-colors rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technology.length > 5 && (
                        <span className="border border-line bg-paper/[0.03] px-2 py-0.5 font-mono text-[10px] text-paper-dim/60 rounded-sm">
                          +{project.technology.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 border-t border-line/40 mt-4 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {/* Direct Git Project Code */}
                    <a
                      href={project.github || "https://github.com/KrishalDai17"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Direct Git Project Code"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-line bg-paper/5 text-paper hover:text-white hover:border-signal hover:bg-signal/20 font-mono text-[10px] tracking-wider transition-all duration-150 rounded-sm hover:scale-105 active:scale-95"
                      title="Direct GitHub Project Code"
                    >
                      <Github size={12} />
                      <span>CODE</span>
                    </a>

                    {/* Live Website Demo / Interactive Showcase */}
                    <a
                      href={
                        project.demo && !project.demo.includes("github.com")
                          ? project.demo
                          : `/projects/${project.slug}`
                      }
                      target={project.demo && !project.demo.includes("github.com") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label="View Project Demo"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-signal/60 bg-signal/15 text-signal hover:text-white hover:border-signal hover:bg-signal font-mono text-[10px] tracking-wider transition-all duration-150 rounded-sm hover:scale-105 active:scale-95 shadow-sm font-medium"
                      title="View Project Demo & Showcase"
                    >
                      <ExternalLink size={12} />
                      <span>DEMO</span>
                    </a>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 bg-paper/5 hover:bg-signal hover:text-white border border-line hover:border-signal px-3 py-1.5 font-mono text-[10px] tracking-wider text-paper transition-all duration-200 rounded-sm hover:scale-105 active:scale-95 hover:shadow-[0_0_12px_rgba(79,124,255,0.4)]"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
