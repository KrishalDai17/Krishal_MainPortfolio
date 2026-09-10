"use client";

import { useState } from "react";
import {
  X,
  ExternalLink,
  Github,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Globe,
  Maximize2,
} from "lucide-react";
import type { Project } from "@/lib/data";

export default function LiveDemoModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [loading, setLoading] = useState(true);

  if (!project) return null;

  const demoUrl = project.demo || project.github;
  const isGitUrl = demoUrl?.includes("github.com");

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-up">
      {/* Container simulating a browser window */}
      <div className="w-full max-w-6xl h-[92vh] bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col overflow-hidden shadow-2xl">
        {/* Browser Top Navigation Bar */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-3 flex-wrap select-none">
          {/* Window dots & Project title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                aria-label="Close"
              />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-zinc-200">
                {project.name}
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">
                {project.category}
              </span>
            </div>
          </div>

          {/* Simulated Browser Address Bar */}
          <div className="flex-1 max-w-md mx-2 bg-zinc-950/80 border border-zinc-800 rounded-md px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <Globe size={13} className="text-zinc-500 shrink-0" />
            <span className="truncate text-zinc-300 select-all">{demoUrl}</span>
            <button
              onClick={() => {
                setLoading(true);
                setIframeKey((k) => k + 1);
              }}
              title="Reload frame"
              className="ml-auto text-zinc-500 hover:text-zinc-200"
            >
              <RotateCw size={12} />
            </button>
          </div>

          {/* Viewport Switcher & Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-zinc-950 border border-zinc-800 rounded p-0.5">
              <button
                onClick={() => setDevice("desktop")}
                className={`p-1.5 rounded transition-colors ${
                  device === "desktop"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Desktop View"
              >
                <Monitor size={14} />
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`p-1.5 rounded transition-colors ${
                  device === "tablet"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Tablet View (768px)"
              >
                <Tablet size={14} />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`p-1.5 rounded transition-colors ${
                  device === "mobile"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone size={14} />
              </button>
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-mono transition-colors"
                title="View Git Code"
              >
                <Github size={13} />
                <span className="hidden sm:inline">CODE</span>
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-medium transition-colors shadow-sm"
                title="Open Website in New Window"
              >
                <span>OPEN FULL</span>
                <ExternalLink size={13} />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Browser Content Area */}
        <div className="flex-1 bg-zinc-900/60 overflow-hidden flex items-center justify-center relative p-2 sm:p-4">
          <div
            className={`h-full transition-all duration-300 rounded-lg overflow-hidden bg-white shadow-lg border border-zinc-800 ${
              device === "mobile"
                ? "w-[390px]"
                : device === "tablet"
                ? "w-[768px]"
                : "w-full"
            }`}
          >
            {demoUrl && !isGitUrl ? (
              <iframe
                key={iframeKey}
                src={demoUrl}
                title={`${project.name} Live Demo`}
                className="w-full h-full border-0"
                onLoad={() => setLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            ) : (
              /* Fallback preview for git URLs or non-iframe sites */
              <div className="h-full w-full bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center p-8 text-center">
                {project.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.coverImageUrl}
                    alt={project.name}
                    className="max-h-56 object-cover rounded-md border border-zinc-800 mb-6 shadow-md"
                  />
                ) : null}
                <h3 className="font-display text-2xl uppercase text-zinc-100 mb-2">
                  {project.name}
                </h3>
                <p className="text-zinc-400 text-sm max-w-md mb-6 leading-relaxed">
                  {project.shortDescription || project.description}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-md font-mono text-xs font-semibold shadow-md transition-colors"
                  >
                    <ExternalLink size={15} /> LAUNCH LIVE PROJECT WEBSITE
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-5 py-2.5 rounded-md font-mono text-xs transition-colors border border-zinc-700"
                    >
                      <Github size={15} /> VIEW GIT CODE
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info banner */}
        <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>LIVE PROJECT ENVIRONMENT</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Status: {project.status}</span>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              Open direct website <Maximize2 size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
