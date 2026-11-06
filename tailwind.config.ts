import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        deep: "var(--deep)",
        paper: "var(--paper)",
        ink: "var(--ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-text)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
