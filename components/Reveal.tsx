"use client";

import { useEffect, useRef, useState } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "none";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 600,
  direction = "up",
  threshold = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check if already in viewport on mount (e.g. above-the-fold hero elements)
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), Math.min(delay, 200));
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, once, threshold]);

  // Direction transform styles
  const getInitialClass = () => {
    switch (direction) {
      case "left":
        return "-translate-x-8";
      case "right":
        return "translate-x-8";
      case "scale":
        return "scale-95";
      case "down":
        return "-translate-y-7";
      case "none":
        return "";
      case "up":
      default:
        return "translate-y-7";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : `opacity-0 ${getInitialClass()}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
