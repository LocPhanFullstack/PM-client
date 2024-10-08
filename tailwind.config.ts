import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gray: {
          "100": "#f3f4f6",
          "200": "#e5e7eb",
          "300": "#d1d5db",
          "500": "#6b7280",
          "700": "#374151",
          "800": "#1f2937",
        },
        blue: {
          "200": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f21",
        "dark-tertiary": "#3b3d40",
        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135",
        background: "var(--background)", // Use CSS variable
        "content-surface": "var(--content-surface)",
        foreground: "var(--foreground)", // Use CSS variable
        text: "var(--text)",
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        card: {
          DEFAULT: "var(--card)", // Use CSS variable
          foreground: "var(--card-foreground)", // Use CSS variable
        },
        popover: {
          DEFAULT: "var(--popover)", // Use CSS variable
          foreground: "var(--popover-foreground)", // Use CSS variable
        },
        primary: {
          DEFAULT: "var(--primary)", // Use CSS variable
          foreground: "var(--primary-blur-behind)", // Use CSS variable
        },
        secondary: {
          DEFAULT: "var(--secondary)", // Use CSS variable
          foreground: "var(--secondary-foreground)", // Use CSS variable
        },
        tertiary: {
          DEFAULT: "var(--tertiary)", // Use CSS variable
        },
        muted: {
          DEFAULT: "var(--muted)", // Use CSS variable
          foreground: "var(--muted-foreground)", // Use CSS variable
        },
        accent: {
          DEFAULT: "var(--accent)", // Use CSS variable
          foreground: "var(--accent-foreground)", // Use CSS variable
        },
        destructive: {
          DEFAULT: "var(--destructive)", // Use CSS variable
          foreground: "var(--destructive-foreground)", // Use CSS variable
        },
        border: "var(--border)", // Use CSS variable
        input: "var(--input)", // Use CSS variable
        ring: "var(--ring)", // Use CSS variable
        chart: {
          "1": "var(--chart-1)", // Use CSS variable
          "2": "var(--chart-2)", // Use CSS variable
          "3": "var(--chart-3)", // Use CSS variable
          "4": "var(--chart-4)", // Use CSS variable
          "5": "var(--chart-5)", // Use CSS variable
        },
      },
    },
  },
  variants: {
    extend: {
      textColor: ["dark"],
    },
  },
  plugins: [],
};

export default config;
