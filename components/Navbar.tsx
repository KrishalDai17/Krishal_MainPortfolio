"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, Github, Linkedin } from "lucide-react";
import { navLinks as defaultNavLinks, profile as defaultProfile, NavItem } from "@/lib/data";

export default function Navbar({
  navLinks = defaultNavLinks,
  availableForOpportunities = true,
  githubUrl = defaultProfile.links.github,
  linkedinUrl = defaultProfile.links.linkedin,
}: {
  navLinks?: NavItem[];
  availableForOpportunities?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    setIsLight(document.documentElement.classList.contains("light"));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    window.localStorage.setItem("ks-theme", next ? "light" : "dark");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-5"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-xl bg-[var(--nav-bg)] border-b border-line shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)]"
              : "bg-transparent"
          }`}
        >
          {/* Logo — Compact, Proportioned, Responsive */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0 transition-transform duration-300 hover:scale-[1.03]"
            data-cursor="HOME"
            aria-label="Krishal Shrestha Home"
          >
            {/* Monogram emblem badge */}
            <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border border-line bg-paper/[0.04] backdrop-blur-sm transition-all duration-300 group-hover:border-signal group-hover:bg-signal/10 group-hover:shadow-[0_0_14px_rgba(79,124,255,0.45)] group-hover:rotate-6">
              <span className="font-mono text-[11px] sm:text-xs font-bold text-signal tracking-tight transition-colors group-hover:text-signal-soft">
                KS
              </span>
              {/* Micro accent dot */}
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-signal ring-2 ring-[rgb(var(--color-ink))] transition-transform group-hover:scale-125" />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="font-display text-xs sm:text-[13px] font-bold tracking-widest text-paper transition-colors group-hover:text-signal">
                KRISHAL<span className="text-signal">.</span>
              </span>
              <span className="hidden sm:block font-mono text-[8px] tracking-widest2 text-paper-dim/60 transition-colors group-hover:text-paper-dim">
                PORTFOLIO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative font-mono text-[11px] tracking-widest2 text-paper-dim hover:text-paper transition-colors py-1.5"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-signal via-violet to-cyan transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions & Social Links */}
          <div className="hidden lg:flex items-center gap-3">
            {availableForOpportunities && (
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest2 text-paper-dim/80 bg-paper/5 px-2.5 py-1.5 border border-line rounded-sm transition-colors hover:border-lime/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
                </span>
                AVAILABLE FOR HIRE
              </div>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 text-paper-dim hover:text-paper hover:border-signal border border-line rounded-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_12px_rgba(79,124,255,0.25)]"
              >
                <Github size={15} />
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 text-paper-dim hover:text-paper hover:border-signal border border-line rounded-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_12px_rgba(79,124,255,0.25)]"
              >
                <Linkedin size={15} />
              </a>
            )}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 border border-line hover:border-signal text-paper-dim hover:text-paper rounded-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_12px_rgba(79,124,255,0.25)]"
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 border border-line text-paper-dim hover:text-paper transition-colors"
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              className="p-2 text-paper border border-line"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[80] bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden flex flex-col justify-between p-6 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line pb-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-signal/10">
              <span className="font-mono text-xs font-bold text-signal">KS</span>
            </div>
            <span className="font-display text-sm font-bold tracking-wider text-paper">
              KRISHAL<span className="text-signal">.</span>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 border border-line text-paper hover:text-signal"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 my-auto overflow-y-auto py-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl py-2 text-paper hover:text-signal border-b border-line/40 transition-colors"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-line pt-6 space-y-4">
          {availableForOpportunities && (
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest2 text-paper-dim">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              AVAILABLE FOR HIRE / OPPORTUNITIES
            </div>
          )}
          <div className="flex items-center gap-4 pt-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-line px-4 py-2 font-mono text-xs text-paper hover:border-signal"
              >
                <Github size={14} /> GITHUB
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-line px-4 py-2 font-mono text-xs text-paper hover:border-signal"
              >
                <Linkedin size={14} /> LINKEDIN
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
