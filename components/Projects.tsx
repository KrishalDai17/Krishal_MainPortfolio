import { Github, ArrowUpRight } from "lucide-react";
import { projects as defaultProjects, Project } from "@/lib/data";
import Reveal from "./Reveal";

export default function Projects({
  projects = defaultProjects,
}: {
  projects?: Project[];
} = {}) {
  return (
    <section id="projects" className="section-glow glow-blue-violet py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-signal">03 — PROJECTS</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">Things I&apos;ve built.</h2>
          <p className="mt-4 text-paper-dim max-w-xl">
            From databases to mobile applications and authentication systems.
          </p>
        </Reveal>

        <div className="mt-16 divide-y divide-line border-t border-line">
          {projects.map((project, i) => (
            <Reveal key={project.index} delay={i * 60}>
              <div className="group py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-2">
                  <span className="font-mono text-5xl text-paper-dim group-hover:text-signal transition-colors">
                    {project.index}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="font-display text-3xl md:text-4xl uppercase text-paper group-hover:text-signal transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-4 text-paper-dim leading-relaxed max-w-lg">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technology.map((tech) => (
                      <span
                        key={tech}
                        className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-widest2 text-paper-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <span className="font-mono text-[10px] tracking-widest2 text-paper-dim block mb-3">
                    FEATURES
                  </span>
                  <ul className="space-y-1.5">
                    {project.features.map((f) => (
                      <li key={f} className="text-sm text-paper flex items-start gap-2">
                        <span className="text-signal mt-1.5">—</span> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="OPEN"
                        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest2 text-paper hover:text-signal transition-colors"
                      >
                        <Github size={14} /> VIEW PROJECT
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest2 text-paper hover:text-signal transition-colors"
                      >
                        DEMO <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
