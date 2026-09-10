"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

interface NepaliMaskIntroProps {
  imageUrl?: string;
  durationSeconds?: number;
  frequency?: "once_per_session" | "always";
  enabled?: boolean;
}

export default function NepaliMaskIntro({
  imageUrl = "/images/lakhey-mask-transparent.png",
  durationSeconds = 3.2,
  frequency = "once_per_session",
  enabled = true,
}: NepaliMaskIntroProps) {
  const pathname = usePathname();
  const [active, setActive] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  const dismiss = useCallback(() => {
    setFadingOut(true);
    try {
      sessionStorage.setItem("ks-mask-intro-seen", "1");
    } catch {
      // ignore
    }
    const timer = setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("mask-intro-active");
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!enabled || pathname?.startsWith("/admin")) {
      setActive(false);
      document.documentElement.classList.remove("mask-intro-active");
      return;
    }

    // Accessibility: check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => dismiss(), 300);
      return () => clearTimeout(quickTimer);
    }

    // Check session storage frequency
    if (frequency === "once_per_session") {
      try {
        if (sessionStorage.getItem("ks-mask-intro-seen") === "1") {
          setActive(false);
          document.documentElement.classList.remove("mask-intro-active");
          return;
        }
      } catch {
        // ignore
      }
    }

    document.body.style.overflow = "hidden";

    // Auto dismiss after cinematic animation sequence (default 3.2s)
    const totalMs = Math.max(2400, Math.round(durationSeconds * 1000));
    const fadeTimer = setTimeout(() => {
      dismiss();
    }, totalMs);

    // Escape key as discreet keyboard fallback
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(fadeTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled, durationSeconds, frequency, dismiss, pathname]);

  if (!enabled || !active || pathname?.startsWith("/admin")) return null;

  // Use the isolated transparent Lakhey mask
  const resolvedMask =
    imageUrl === "/images/nepali-mask-light.jpg" || imageUrl === "/images/nepali-mask-dark.jpg"
      ? "/images/lakhey-mask-transparent.png"
      : imageUrl || "/images/lakhey-mask-transparent.png";

  return (
    <aside
      aria-label="Lakhey Cultural Intro"
      className={`intro-overlay-ssr fixed inset-0 z-[100] w-screen h-screen overflow-hidden flex flex-col items-center justify-center transition-opacity duration-500 ease-out select-none ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: "#07080d",
      }}
    >
      {/* ============================================================ */}
      {/* LAYER 1: Full-Screen Reference Background (100vw x 100vh)   */}
      {/* Perfectly stable, fixed, never scales or zooms               */}
      {/* ============================================================ */}
      <div className="absolute inset-0 -z-20 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/lakhey-cinematic-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* ============================================================ */}
      {/* LAYER 2: Subtle Ambient Atmospheric Vignette & Center Glow   */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(22, 23, 38, 0.45) 0%, rgba(7, 8, 13, 0.85) 68%, #07080d 100%)",
        }}
        aria-hidden="true"
      />

      {/* Center Warm Crimson/Ember Undertone */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(260px,50vw,480px)] h-[clamp(260px,50vw,480px)] rounded-full -z-10 pointer-events-none filter blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.6) 0%, rgba(185, 28, 28, 0.2) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* LAYER 2b: Reference Composition (Circular Design & Lines)   */}
      {/* Stable geometry: circular outline, horizontal datum, markers */}
      {/* ============================================================ */}
      <div className="relative flex flex-col items-center justify-center p-6 w-full max-w-4xl">
        
        {/* Outer subtle circular outline (matches reference) */}
        <div
          className="absolute w-[clamp(230px,56vw,420px)] h-[clamp(230px,56vw,420px)] rounded-full border border-white/[0.08] pointer-events-none"
          aria-hidden="true"
        />

        {/* Inner subtle circular ring */}
        <div
          className="absolute w-[clamp(190px,46vw,340px)] h-[clamp(190px,46vw,340px)] rounded-full border border-white/[0.04] pointer-events-none"
          aria-hidden="true"
        />

        {/* Thin horizontal alignment datum line */}
        <div
          className="absolute w-[clamp(180px,48vw,360px)] h-px bg-white/[0.08] pointer-events-none"
          aria-hidden="true"
        />

        {/* Tiny crosshair alignment marks (+) */}
        <div
          className="absolute w-3 h-3 pointer-events-none -top-1 font-mono text-[9px] leading-none text-zinc-400/40 select-none flex items-center justify-center"
          aria-hidden="true"
        >
          +
        </div>
        <div
          className="absolute w-3 h-3 pointer-events-none -bottom-1 font-mono text-[9px] leading-none text-zinc-400/40 select-none flex items-center justify-center"
          aria-hidden="true"
        >
          +
        </div>

        {/* Minimalist guide dots */}
        <div
          className="absolute -left-4 sm:-left-6 w-1 h-1 rounded-full bg-white/20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -right-4 sm:-right-6 w-1 h-1 rounded-full bg-white/20 pointer-events-none"
          aria-hidden="true"
        />

        {/* ============================================================ */}
        {/* LAYER 3: LAKHEY MASK FOREGROUND — HERO ANIMATION            */}
        {/* Only the mask animates:                                      */}
        {/* Phase 1: Small in darkness (0.15 scale, opacity 0)          */}
        {/* Phase 2: Reveal & grow (0.15 → 1.0) with cubic-bezier       */}
        {/* Phase 3: Powerful close-up (1.0 → 1.18 scale)               */}
        {/* Phase 4: Zoom out & fade (1.18 → 0.48 scale, opacity → 0)   */}
        {/* ============================================================ */}
        <div className="relative flex items-center justify-center select-none my-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolvedMask}
            alt="Traditional Nepali Lakhey Mask Artwork"
            className="lakhey-mask-animated w-[clamp(180px,46vw,360px)] h-auto aspect-[1024/736] max-h-[46vh] object-contain select-none pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)]"
            style={{
              animationDuration: `${durationSeconds}s`,
            }}
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* ============================================================ */}
        {/* LAYER 4: Reference Typography (Stable & Centered Below)     */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-1.5 text-center pointer-events-none select-none">
          <span className="font-display text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.38em] uppercase text-zinc-100/85 font-medium">
            KRISHAL SHRESTHA
          </span>
          <span className="font-mono text-[9px] sm:text-[9.5px] md:text-[10px] tracking-[0.25em] uppercase text-zinc-400/60">
            ENGINEER BY LOGIC · CREATOR BY VISION
          </span>
        </div>

      </div>
    </aside>
  );
}
