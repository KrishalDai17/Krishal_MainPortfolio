"use client";

import { useEffect, useState } from "react";

const WORDS = ["BUILD", "TEST", "CREATE", "CAPTURE"];

export default function LoadingScreen() {
  const [wordIndex, setWordIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const wordTimer = setInterval(() => {
      setWordIndex((i) => (i + 1 < WORDS.length ? i + 1 : i));
    }, 260);

    const doneTimer = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, 1500);

    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(wordTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] bg-ink flex flex-col items-center justify-center gap-6 transition-opacity duration-700 ease-out ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <span className="font-display text-2xl tracking-[0.3em] text-paper/70">KS</span>
      <span className="font-mono text-xs tracking-widest2 text-signal">
        {WORDS[wordIndex]}
      </span>
      <div className="w-40 h-px bg-line relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-signal w-1/3 animate-[marquee_1.4s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
