"use client";

import { useEffect } from "react";

export default function ThemeInit() {
  useEffect(() => {
    const stored = window.localStorage.getItem("ks-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = stored || (prefersLight ? "light" : "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, []);

  return null;
}
