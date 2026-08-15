"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0,
      ringY = 0;

    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ringX = e.clientX;
      ringY = e.clientY;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
    };

    const accentFor = (type: string) => {
      if (type === "VIEW") return "#EC4899";
      if (type === "OPEN") return "#4F7CFF";
      return "#4F7CFF";
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor") || "";
        const accent = accentFor(type);
        setLabel(type);
        ring.style.width = type ? "58px" : "48px";
        ring.style.height = type ? "58px" : "48px";
        ring.style.borderColor = accent;
        ring.style.boxShadow = `0 0 22px 2px ${accent}55`;
        dot.style.background = accent;
        dot.style.boxShadow = `0 0 12px 2px ${accent}b3`;
      } else if (target.closest("a, button")) {
        setLabel("");
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "#4F7CFF";
        ring.style.boxShadow = "0 0 18px 2px rgba(79,124,255,0.35)";
        dot.style.background = "#4F7CFF";
        dot.style.boxShadow = "0 0 12px 2px rgba(79,124,255,0.7)";
      } else {
        setLabel("");
        ring.style.width = "34px";
        ring.style.height = "34px";
        ring.style.borderColor = "rgb(var(--color-paper) / 0.5)";
        ring.style.boxShadow = "none";
        dot.style.background = "#4F7CFF";
        dot.style.boxShadow = "0 0 12px 2px rgba(79,124,255,0.7)";
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:flex">
        {label}
      </div>
    </>
  );
}
