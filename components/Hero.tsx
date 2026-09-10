"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, ArrowUpRight, Camera, Terminal, ArrowDown, ShieldCheck, Cpu, Code2 } from "lucide-react";
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
    "QA ENGINEER",
    "FULL-STACK",
    "CREATIVE PHOTOGRAPHER",
  ];

  return (
    <section
      id="home"
      className="section-glow glow-blue-violet relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 pb-12 px-6 md:px-10"
    >
      {/* Background technical coordinate crosshairs */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-paper" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-paper" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-4">
          
          {/* LEFT: Typographic Identity & Sequential Entrance */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* 2. Main Name Heading */}
            <Reveal delay={100} direction="up">
              <h1 className="font-display text-hero uppercase text-paper tracking-tight">
                {profile.firstName}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-paper via-paper-dim to-paper/80">
                  {profile.lastName}
                </span>
              </h1>
            </Reveal>

            {/* 3. Signature Headline */}
            <Reveal delay={200} direction="up">
              <div className="mt-5 text-display-md uppercase tracking-tight leading-tight">
                <span className="font-display font-semibold text-signal">
                  {profile.tagline[0]}
                </span>
                <br />
                <span className="font-serif italic text-violet font-normal">
                  {profile.tagline[1]}
                </span>
              </div>
            </Reveal>

            {/* 4. Roles pills */}
            <Reveal delay={300} direction="up">
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {rolesList.map((role) => (
                  <span
                    key={role}
                    className="border border-line bg-ink/40 px-3 py-1 font-mono text-[10px] tracking-widest2 text-paper-dim hover:text-paper hover:border-signal/50 transition-colors"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* 5. Hero description */}
            <Reveal delay={400} direction="up">
              <p className="mt-6 max-w-2xl text-paper-dim text-base md:text-lg leading-relaxed">
                {profile.heroSupport}
              </p>
            </Reveal>

            {/* 6. Action Buttons with modern scale, glow, and shine sweep */}
            <Reveal delay={500} direction="up">
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                {/* View My Projects */}
                <a
                  href="#projects"
                  data-cursor="OPEN"
                  className="btn-shine-sweep group inline-flex items-center gap-2.5 bg-gradient-to-r from-signal via-signal to-violet text-white px-7 py-3.5 font-mono text-[11px] tracking-widest2 rounded-sm shadow-lg shadow-signal/20 hover:shadow-signal/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  VIEW MY PROJECTS
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                {/* Explore Photography */}
                <Link
                  href="/photography"
                  className="btn-shine-sweep group inline-flex items-center gap-2.5 border border-line bg-paper/[0.03] px-6 py-3.5 font-mono text-[11px] tracking-widest2 text-paper hover:border-pink hover:text-pink hover:bg-pink/[0.04] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 rounded-sm"
                >
                  <Camera size={14} className="text-pink transition-transform duration-300 group-hover:scale-125" />
                  EXPLORE PHOTOGRAPHY
                </Link>

                {/* GitHub */}
                {profile.links.github && (
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-line px-5 py-3.5 font-mono text-[11px] tracking-widest2 text-paper-dim hover:text-paper hover:border-signal hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 rounded-sm"
                  >
                    <Github size={14} />
                    GITHUB
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Profile Showcase with Clean Frame & Background-Removed Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Reveal delay={250} direction="scale" className="relative w-full max-w-[340px] sm:max-w-[400px]">
              <div className="relative aspect-square w-full flex items-center justify-center">
                
                {/* Ambient Radial Color Bloom */}
                <div className="animate-pulse-glow absolute inset-4 rounded-full bg-gradient-to-tr from-signal/25 via-violet/20 to-cyan/15 blur-2xl -z-10" />

                {/* Clean Sleek Circular Border */}
                <div className="absolute inset-1 rounded-full border border-paper/10 bg-paper/[0.02]" />
                <div className="absolute inset-3 rounded-full border border-paper/5" />

                {/* Profile Portrait (Background-Removed Image with Subtle Float) */}
                <div className="animate-float-subtle relative z-10 w-[84%] h-[84%] flex items-end justify-center overflow-hidden rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatarUrl || "/images/krishal-profile.png"}
                    alt={profile.name}
                    className="w-full h-full object-contain object-bottom select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Floating Tech Badge — Top Left */}
                <div className="animate-float-subtle absolute -top-2 -left-2 z-20 flex items-center gap-2 border border-line bg-ink/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg font-mono text-[10px] tracking-widest2 text-signal" style={{ animationDelay: "1s" }}>
                  <Cpu size={12} className="text-signal" />
                  <span>FULL-STACK</span>
                </div>

                {/* Floating Tech Badge — Bottom Right */}
                <div className="animate-float-subtle absolute -bottom-2 -right-2 z-20 flex items-center gap-2 border border-line bg-ink/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg font-mono text-[10px] tracking-widest2 text-lime" style={{ animationDelay: "2s" }}>
                  <Code2 size={12} className="text-lime" />
                  <span>SOFTWARE DEVELOPER</span>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Bottom bar with HUD telemetry */}
      <div className="relative mx-auto w-full max-w-7xl flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-12 pt-8 border-t border-line/60">
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
        className="hidden lg:flex absolute bottom-8 right-10 items-center gap-2 font-mono text-[10px] tracking-widest2 text-paper-dim hover:text-signal transition-all duration-300 hover:translate-y-1"
      >
        SCROLL <ArrowDown size={12} />
      </a>
    </section>
  );
}
