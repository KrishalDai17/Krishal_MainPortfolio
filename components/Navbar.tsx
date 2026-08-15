"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar({
  availableForOpportunities = true,
}: {
  availableForOpportunities?: boolean;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 transition-all duration-500 ${
            scrolled ? "backdrop-blur-xl bg-[var(--nav-bg)] border-b border-line shadow-[0_1px_0_0_rgba(79,124,255,0.15)]" : "bg-transparent"
          }`}
        >
          <a
            href="#home"
            className="font-display text-lg tracking-widest text-paper"
            data-cursor=""
          >
            KS.
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-[11px] tracking-widest2 text-paper/60 hover:text-paper transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-signal to-violet transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            {availableForOpportunities && (
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest2 text-paper/60">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
                </span>
                AVAILABLE FOR OPPORTUNITIES
              </div>
            )}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 border border-line hover:border-signal transition-colors"
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-paper"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[80] bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-display text-lg tracking-widest text-paper">KS.</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-paper">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 mt-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl py-3 border-b border-line text-paper"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {availableForOpportunities && (
          <div className="px-6 mt-10 flex items-center gap-3 font-mono text-[10px] tracking-widest2 text-paper/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
            </span>
            AVAILABLE FOR OPPORTUNITIES
          </div>
        )}
        <button
          onClick={toggleTheme}
          className="mt-8 mx-6 flex items-center gap-2 px-4 py-3 border border-line font-mono text-[10px] tracking-widest2 text-paper"
        >
          {isLight ? <Moon size={14} /> : <Sun size={14} />} TOGGLE THEME
        </button>
      </div>
    </>
  );
}
