"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, ArrowUpRight, Camera, Terminal, ArrowDown } from "lucide-react";
import { profile as defaultProfile, hudCycle } from "@/lib/data";
import Reveal from "./Reveal";

export default function Hero({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile;
} = {}) {
  const [hudIndex, setHudIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHudIndex((i) => (i + 1) % hudCycle.length), 1600);
    return () => clearInterval(t);
  }, []);

  const rolesList = [
    "SOFTWARE DEVELOPER",
    "FULL-STACK ENGINEER",
    "IT PROFESSIONAL",
    "CREATIVE PHOTOGRAPHER",
  ];

  return (
    <section
      id="home"
      className="section-glow glow-blue-violet relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-32 pb-12 px-6 md:px-10"
    >
      {/* Background crosshair coordinates */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-paper" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-paper" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl flex-1 flex flex-col justify-center">
        {/* Status location badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-widest2 text-signal mb-6 border border-line/60 bg-paper/5 px-3 py-1 w-fit">
            <Terminal size={12} />
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            <span>{profile.location.toUpperCase()}</span>
            <span className="text-paper-dim/40">•</span>
            <span className="text-paper-dim">SYSTEM ONLINE</span>
          </div>
        </Reveal>

        {/* Name */}
        <Reveal delay={80}>
          <h1 className="font-display text-hero uppercase text-paper tracking-tight">
            {profile.firstName}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-paper via-paper-dim to-paper/80">
              {profile.lastName}
            </span>
          </h1>
        </Reveal>

        {/* Signature Headline */}
        <Reveal delay={160}>
          <div className="mt-6 text-display-md uppercase tracking-tight">
            <span className="font-display font-semibold text-signal">
              {profile.tagline[0]}
            </span>{" "}
            <span className="font-serif italic text-violet font-normal">
              {profile.tagline[1]}
            </span>
          </div>
        </Reveal>

        {/* Roles pills */}
        <Reveal delay={220}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {rolesList.map((role) => (
              <span
                key={role}
                className="border border-line bg-ink/40 px-3 py-1 font-mono text-[10px] tracking-widest2 text-paper-dim"
              >
                {role}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Hero description */}
        <Reveal delay={300}>
          <p className="mt-6 max-w-2xl text-paper-dim text-base md:text-lg leading-relaxed">
            {profile.heroSupport}
          </p>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={380}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* View My Projects */}
            <a
              href="#projects"
              data-cursor="OPEN"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-signal to-violet text-white px-7 py-3.5 font-mono text-[11px] tracking-widest2 shadow-lg shadow-signal/20 hover:shadow-signal/40 transition-all"
            >
              VIEW MY PROJECTS
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Explore Photography */}
            <Link
              href="/photography"
              className="group inline-flex items-center gap-2 border border-line bg-paper/5 px-6 py-3.5 font-mono text-[11px] tracking-widest2 text-paper hover:border-pink hover:text-pink transition-colors"
            >
              <Camera size={14} className="text-pink transition-transform group-hover:scale-110" />
              EXPLORE PHOTOGRAPHY
            </Link>

            {/* GitHub */}
            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-line px-5 py-3.5 font-mono text-[11px] tracking-widest2 text-paper-dim hover:text-paper hover:border-signal transition-colors"
              >
                <Github size={14} />
                GITHUB
              </a>
            )}
          </div>
        </Reveal>
      </div>

      {/* Bottom bar with HUD telemetry */}
      <div className="relative mx-auto w-full max-w-7xl flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-16 pt-8 border-t border-line/60">
        <div className="flex items-center gap-6 font-mono text-[11px] tracking-widest2 text-paper-dim">
          <span>DISCIPLINE: SOFTWARE · QA · TECHNOLOGY</span>
          <span className="hidden md:inline text-paper-dim/40">•</span>
          <span className="hidden md:inline">CREATIVE: PHOTOGRAPHY</span>
        </div>

        {/* Viewfinder HUD */}
        <div className="hud-frame glass-panel w-full sm:w-[320px] px-4 py-3 font-mono text-[10px] tracking-widest2 text-paper-dim">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-blink" /> READY
            </span>
            <span className="text-paper-dim">{profile.location.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-line/40">
            <span>CURRENT FOCUS</span>
            <span className="text-signal font-semibold">[{hudCycle[hudIndex]}]</span>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hidden lg:flex absolute bottom-8 right-10 items-center gap-2 font-mono text-[10px] tracking-widest2 text-paper-dim hover:text-signal transition-colors"
      >
        SCROLL <ArrowDown size={12} />
      </a>
    </section>
  );
}
