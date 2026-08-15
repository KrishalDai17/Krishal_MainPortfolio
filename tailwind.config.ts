import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          soft: "rgb(var(--color-ink-soft) / <alpha-value>)",
          raised: "rgb(var(--color-ink-raised) / <alpha-value>)",
        },
        paper: {
          DEFAULT: "rgb(var(--color-paper) / <alpha-value>)",
          dim: "rgb(var(--color-paper-dim) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "#4F7CFF",
          soft: "#8CA6FF",
          dim: "#16224D",
        },
        violet: { DEFAULT: "#8B5CF6", soft: "#B29CFA" },
        cyan: { DEFAULT: "#22D3EE", soft: "#7EE6F5" },
        pink: { DEFAULT: "#EC4899", soft: "#F58AC0" },
        orange: { DEFAULT: "#FB923C", soft: "#FDBA84" },
        lime: { DEFAULT: "#A3E635", soft: "#C6EF8C" },
        ember: {
          DEFAULT: "#FB923C",
          soft: "#FDBA84",
        },
        line: "rgb(var(--color-line) / 0.12)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        editorial: ["var(--font-dm-sans)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      fontSize: {
        "hero": ["clamp(3.2rem, 10vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.4rem, 6vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.8rem, 4vw, 3.2rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "grain": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjA0Ii8+PC9zdmc+')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -4%) scale(1.06)" },
        },
        "shimmer": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        scan: "scan 3s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
