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
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-display text-lg tracking-widest text-paper hover:text-signal transition-colors"
            data-cursor="HOME"
          >
            <span className="font-mono font-bold text-signal">KS</span>
            <span className="text-paper-dim/40 group-hover:text-paper-dim transition-colors">/</span>
            <span className="hidden sm:inline text-sm font-semibold tracking-wider text-paper">KRISHAL</span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative font-mono text-[11px] tracking-widest2 text-paper-dim hover:text-paper transition-colors py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-signal to-violet transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions & Social Links */}
          <div className="hidden lg:flex items-center gap-4">
            {availableForOpportunities && (
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest2 text-paper-dim/80 bg-paper/5 px-2.5 py-1 border border-line">
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
                className="p-2 text-paper-dim hover:text-paper hover:border-signal border border-line transition-colors"
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
                className="p-2 text-paper-dim hover:text-paper hover:border-signal border border-line transition-colors"
              >
                <Linkedin size={15} />
              </a>
            )}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 border border-line hover:border-signal text-paper-dim hover:text-paper transition-colors"
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
            className="font-display text-lg tracking-widest text-paper"
          >
            <span className="font-mono text-signal">KS</span> / KRISHAL
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
