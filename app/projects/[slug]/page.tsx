import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Layers,
  Code2,
  Terminal,
} from "lucide-react";
import { getProjectBySlug, getProjects, getSettings } from "@/lib/cms/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project Not Found | Krishal Shrestha" };
  }

  return {
    title: `${project.name} | Krishal Shrestha`,
    description: project.shortDescription || project.description,
    openGraph: {
      title: `${project.name} — Krishal Shrestha`,
      description: project.shortDescription || project.description,
      images: project.coverImageUrl ? [{ url: project.coverImageUrl }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const [project, allProjects, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects(),
    getSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <main className="relative min-h-screen flex flex-col justify-between">
      <Navbar availableForOpportunities={settings.availableForOpportunities} />

      <article className="pt-28 pb-20 px-6 md:px-10 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest2 text-paper-dim hover:text-signal transition-colors"
          >
            <ArrowLeft size={14} /> BACK TO PROJECTS
          </Link>
        </div>

        {/* Header Hero */}
        <header className="border-b border-line pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-xs">
            <span className="bg-signal/15 text-signal px-3 py-1 border border-signal/30 tracking-widest2">
              {project.category}
            </span>
            <span className="bg-lime/15 text-lime px-3 py-1 border border-lime/30 tracking-widest2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" />
              {project.status}
            </span>
            <span className="text-paper-dim ml-auto">
              PROJECT {project.index}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase text-paper tracking-tight">
            {project.name}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-paper-dim leading-relaxed max-w-3xl">
            {project.shortDescription || project.description}
          </p>

          {/* Technology Badges */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.technology.map((tech) => (
              <span
                key={tech}
                className="border border-line bg-paper/5 px-3 py-1 font-mono text-xs text-paper"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={project.github || `https://github.com/KrishalDai17/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-signal text-white px-6 py-3.5 font-mono text-xs tracking-widest2 hover:bg-signal/80 transition-all shadow-md shadow-signal/20 hover:scale-105 active:scale-95"
            >
              <Github size={15} /> GITHUB REPOSITORY
            </a>
            <a
              href={project.demo || project.github || `https://github.com/KrishalDai17/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line bg-paper/5 px-6 py-3.5 font-mono text-xs tracking-widest2 text-paper hover:border-signal hover:text-signal transition-colors hover:scale-105 active:scale-95"
            >
              <ExternalLink size={15} /> LIVE DEMO
            </a>
          </div>
        </header>

        {/* Hero Image */}
        {project.coverImageUrl && (
          <div className="hud-frame my-12 border border-line overflow-hidden aspect-video bg-ink-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Case Study Details */}
        <div className="space-y-16 mt-12">
          {/* Overview */}
          {project.overview && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-signal tracking-widest2">
                <Terminal size={14} /> OVERVIEW
              </div>
              <h2 className="font-display text-2xl md:text-3xl uppercase text-paper">
                Project Architecture & Intent
              </h2>
              <p className="text-paper-dim text-base md:text-lg leading-relaxed whitespace-pre-line">
                {project.overview}
              </p>
            </section>
          )}

          {/* Problem & Solution Grid */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-line pt-12">
              {project.problem && (
                <div className="glass-panel p-8 border border-line/80 space-y-3">
                  <div className="flex items-center gap-2 text-ember font-mono text-xs tracking-widest2">
                    <AlertTriangle size={14} /> THE CHALLENGE / PROBLEM
                  </div>
                  <h3 className="font-display text-xl uppercase text-paper">
                    What needed solving
                  </h3>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="glass-panel p-8 border border-line/80 space-y-3">
                  <div className="flex items-center gap-2 text-lime font-mono text-xs tracking-widest2">
                    <Lightbulb size={14} /> THE ENGINEERED SOLUTION
                  </div>
                  <h3 className="font-display text-xl uppercase text-paper">
                    How it was solved
                  </h3>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <section className="border-t border-line pt-12 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest2">
                <CheckCircle size={14} /> CORE CAPABILITIES
              </div>
              <h2 className="font-display text-2xl md:text-3xl uppercase text-paper">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat) => (
                  <div
                    key={feat}
                    className="border border-line bg-paper/5 p-4 flex items-start gap-3"
                  >
                    <span className="text-signal font-bold mt-0.5">•</span>
                    <span className="text-sm text-paper leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Implementation & Contribution */}
          {(project.technicalImplementation || project.myContribution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-line pt-12">
              {project.technicalImplementation && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-signal tracking-widest2">
                    <Code2 size={14} /> IMPLEMENTATION
                  </div>
                  <h3 className="font-display text-xl uppercase text-paper">
                    Technical Stack
                  </h3>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {project.technicalImplementation}
                  </p>
                </div>
              )}

              {project.myContribution && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-violet tracking-widest2">
                    <Layers size={14} /> ROLE & RESPONSIBILITIES
                  </div>
                  <h3 className="font-display text-xl uppercase text-paper">
                    My Contribution
                  </h3>
                  <p className="text-sm text-paper-dim leading-relaxed">
                    {project.myContribution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Challenges & Solutions */}
          {(project.challenges || project.challengesSolutions) && (
            <section className="border-t border-line pt-12 space-y-4">
              <h2 className="font-display text-2xl md:text-3xl uppercase text-paper">
                Challenges & Solutions
              </h2>
              {project.challenges && (
                <p className="text-paper-dim text-base leading-relaxed">
                  <strong className="text-paper">Obstacle:</strong>{" "}
                  {project.challenges}
                </p>
              )}
              {project.challengesSolutions && (
                <p className="text-paper-dim text-base leading-relaxed">
                  <strong className="text-signal">Resolution:</strong>{" "}
                  {project.challengesSolutions}
                </p>
              )}
            </section>
          )}

          {/* Screenshots Gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="border-t border-line pt-12 space-y-6">
              <h2 className="font-display text-2xl md:text-3xl uppercase text-paper">
                System Screenshots & Interface
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.screenshots.map((img, i) => (
                  <div
                    key={i}
                    className="hud-frame border border-line aspect-video overflow-hidden bg-ink-soft group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.name} preview ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* GitHub Repository CTA Box */}
          <div className="glass-panel p-8 border border-signal/40 bg-gradient-to-r from-signal/10 via-transparent to-violet/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl uppercase text-paper">
                Interested in reviewing the source code?
              </h3>
              <p className="text-xs text-paper-dim mt-1 font-mono">
                Explore the verified GitHub repository, commits, and codebase structure.
              </p>
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-signal hover:bg-signal/80 text-white px-6 py-3 font-mono text-xs tracking-widest2 transition-colors"
              >
                <Github size={15} /> OPEN GITHUB REPO
              </a>
            )}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="border-t border-line mt-24 pt-16">
            <span className="font-mono text-xs text-signal tracking-widest2 block mb-2">
              NEXT UP
            </span>
            <h3 className="font-display text-3xl uppercase text-paper mb-8">
              Explore More Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  className="glass-panel p-6 border border-line hover:border-signal transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[10px] text-signal tracking-widest2">
                      {rel.category}
                    </span>
                    <h4 className="font-display text-xl uppercase text-paper group-hover:text-signal transition-colors mt-2">
                      {rel.name}
                    </h4>
                    <p className="mt-2 text-xs text-paper-dim line-clamp-2">
                      {rel.shortDescription || rel.description}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-mono text-paper-dim group-hover:text-paper transition-colors">
                    READ CASE STUDY →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer profile={profile} footerNote={settings.footerNote} />
    </main>
  );
}
