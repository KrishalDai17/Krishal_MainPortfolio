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
  imageUrl = "/images/nepali-mask-intro.jpg",
  durationSeconds = 2.8,
  frequency = "once_per_session",
  enabled = true,
}: NepaliMaskIntroProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
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
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
    if (!enabled || pathname?.startsWith("/admin")) return;

    // Check session storage
    if (frequency === "once_per_session") {
      try {
        if (sessionStorage.getItem("ks-mask-intro-seen") === "1") {
          return;
        }
      } catch {
        // ignore
      }
    }

    setActive(true);
    document.body.style.overflow = "hidden";

    // Auto dismiss after animation duration
    const totalMs = Math.max(1800, durationSeconds * 1000);
    const fadeTimer = setTimeout(() => {
      dismiss();
    }, totalMs);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismiss();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(fadeTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [enabled, durationSeconds, frequency, dismiss]);

  if (!mounted || !active || pathname?.startsWith("/admin")) return null;

  return (
    <aside
      aria-label="Artistic Intro"
      onClick={dismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 ease-out select-none ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: "rgb(var(--color-ink))",
      }}
    >
      {/* Subtle cinematic atmosphere background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 48%, rgba(255, 60, 60, 0.08) 0%, rgba(0,0,0,0) 65%)",
        }}
        aria-hidden="true"
      />

      {/* Main Mask Artwork container */}
      <div className="relative flex flex-col items-center justify-center p-4 max-w-4xl max-h-[85vh] w-full">
        <div
          className="mask-cinematic-art relative flex items-center justify-center"
          style={{
            animationDuration: `${durationSeconds}s`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Traditional Nepali Cultural Mask Artwork — Krishal Shrestha"
            className="max-h-[66vh] max-w-[86vw] w-auto h-auto object-contain rounded-sm shadow-2xl transition-all duration-300 pointer-events-none"
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* Minimalist branding signature below mask */}
        <div className="mask-subtle-caption mt-6 flex flex-col items-center gap-1 text-center pointer-events-none">
          <span className="font-display text-xs tracking-[0.35em] text-[rgb(var(--color-paper))] opacity-80 uppercase">
            Krishal Shrestha
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[rgb(var(--color-paper-dim))] opacity-60">
            ENGINEER BY LOGIC · CREATOR BY VISION
          </span>
        </div>
      </div>

      {/* Discreet skip hint */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        className="absolute bottom-6 right-6 z-10 px-3 py-1.5 rounded text-[11px] font-mono tracking-widest uppercase text-[rgb(var(--color-paper-dim))] hover:text-[rgb(var(--color-paper))] bg-[rgb(var(--color-paper)/0.05)] hover:bg-[rgb(var(--color-paper)/0.12)] border border-[rgb(var(--color-paper)/0.1)] transition-all duration-200"
      >
        Skip ↗
      </button>
    </aside>
  );
}
