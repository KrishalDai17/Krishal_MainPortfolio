"use client";

import { usePathname } from "next/navigation";

export default function AmbientBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base tech grid & ambient glow */}
      <div className="app-bg" />
      <div className="grain-overlay bg-grain" />

      {/* Floating Gradient Orbs (Subtle, beautiful, non-distracting) */}
      <div
        className="animate-float-circle-1 absolute -top-24 -left-24 h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] rounded-full bg-signal/15 blur-[90px] dark:bg-signal/10"
      />
      <div
        className="animate-float-circle-2 absolute top-[35%] -right-24 h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] rounded-full bg-violet/15 blur-[100px] dark:bg-violet/10"
      />
      <div
        className="animate-float-circle-1 absolute bottom-12 left-[15%] h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] rounded-full bg-cyan/12 blur-[90px] dark:bg-cyan/8"
      />



      {/* Floating Micro Particles / Luminous Bubbles */}
      <div
        className="animate-float-subtle absolute top-[28%] left-[22%] h-1.5 w-1.5 rounded-full bg-signal/50 blur-[0.5px]"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="animate-float-subtle absolute top-[48%] right-[28%] h-2 w-2 rounded-full bg-violet/40 blur-[0.5px]"
        style={{ animationDuration: "8s", animationDelay: "1.5s" }}
      />
      <div
        className="animate-float-subtle absolute top-[72%] left-[42%] h-1 w-1 rounded-full bg-cyan/60 blur-[0.5px]"
        style={{ animationDuration: "7s", animationDelay: "3s" }}
      />

      {/* Horizontal glowing data lines */}
      <div className="bg-glow-line w-[70%] top-[20%] left-[10%]" />
      <div
        className="bg-glow-line w-[50%] top-[65%] right-[6%]"
        style={{ animationDelay: "2.5s" }}
      />
    </div>
  );
}
