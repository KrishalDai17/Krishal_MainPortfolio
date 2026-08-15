"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram, Facebook, ArrowDown, ArrowUpRight } from "lucide-react";
import { profile as defaultProfile, roleBadges as defaultRoleBadges, hudCycle } from "@/lib/data";
import Reveal from "./Reveal";

export default function Hero({
  profile = defaultProfile,
  roleBadges = defaultRoleBadges,
}: {
  profile?: typeof defaultProfile;
  roleBadges?: string[];
} = {}) {
  const [hudIndex, setHudIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHudIndex((i) => (i + 1) % hudCycle.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="section-glow glow-blue-violet relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-32 pb-10 px-6 md:px-10">
      {/* background crosshair lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-paper" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-paper" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl flex-1 flex flex-col justify-center">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest2 text-signal mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            {profile.location.toUpperCase()}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display text-hero uppercase text-paper">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-display-md uppercase">
            <span className="font-display font-semibold text-signal">{profile.tagline[0]}</span>
            <br />
            <span className="font-serif italic text-violet">{profile.tagline[1]}</span>
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-paper-dim text-base md:text-lg leading-relaxed">
            {profile.heroSupport}
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap gap-2">
            {roleBadges.map((role) => (
              <span
                key={role}
                className="border border-line px-3 py-1.5 font-mono text-[10px] tracking-widest2 text-paper-dim"
              >
                {role}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              data-cursor="OPEN"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-signal to-violet text-paper px-6 py-3.5 font-mono text-[11px] tracking-widest2 shadow-[0_0_0_0_rgba(79,124,255,0)] hover:shadow-[0_10px_36px_-8px_rgba(79,124,255,0.55)] transition-shadow"
            >
              EXPLORE MY WORK
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-line px-6 py-3.5 font-mono text-[11px] tracking-widest2 text-paper hover:border-cyan hover:text-cyan transition-colors"
            >
              LET&apos;S CONNECT
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto w-full max-w-7xl flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-16">
        <div className="flex items-center gap-5">
          {[
            { icon: Github, href: profile.links.github },
            { icon: Linkedin, href: profile.links.linkedin || "#" },
            { icon: Instagram, href: profile.links.instagram },
            { icon: Facebook, href: profile.links.facebook },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-dim hover:text-signal transition-colors"
              aria-label="social link"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Viewfinder HUD */}
        <div className="hud-frame glass-panel w-full md:w-[340px] px-5 py-4 font-mono text-[10px] tracking-widest2 text-paper-dim">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 text-ember">
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-blink" /> REC
            </span>
            <span>{profile.location.toUpperCase()}</span>
          </div>
          <div className="text-center py-3 text-paper text-xs">{profile.name.toUpperCase()}</div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-line">
            <span>BUILD / TEST / CREATE</span>
            <span className="text-signal">[{hudCycle[hudIndex]}]</span>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hidden md:flex absolute bottom-8 right-10 items-center gap-2 font-mono text-[10px] tracking-widest2 text-paper-dim hover:text-signal transition-colors"
      >
        SCROLL <ArrowDown size={12} />
      </a>
    </section>
  );
}
