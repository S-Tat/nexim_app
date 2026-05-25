import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        foreground: "#e2e8f0",
        nexim: {
          bg: "#030712",
          heading: "#ffffff",
          text: "#e2e8f0",
          muted: "#94a3b8",
          accent: "#fbbf24",
          glow: "#f59e0b",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        arabic: ["Tahoma", "Segoe UI", "Arial", "sans-serif"],
        orbit: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
