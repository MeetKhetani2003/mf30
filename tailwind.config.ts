import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brand: {
          orange: "#FF6A00",
          "orange-hover": "#E65F00",
          "orange-light": "#FFF4E8",
          charcoal: "#1F2937",
          "soft-white": "#F8FAFC",
          cream: "#FFF4E8",
          gray: "#6B7280",
          border: "#E5E7EB",
          emerald: "#16A34A",
          crimson: "#DC2626",
          amber: "#D97706",
        },
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #FF8A00 0%, #FF6A00 100%)",
        "light-gradient": "linear-gradient(135deg, #FFF8F0 0%, #FFE3CC 100%)",
        "dark-gradient": "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
      },
      boxShadow: {
        "subtle": "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)",
        "card": "0 4px 20px -2px rgba(31, 41, 55, 0.06), 0 2px 6px -1px rgba(31, 41, 55, 0.04)",
        "glow-orange": "0 8px 24px -4px rgba(255, 106, 0, 0.35)",
        "glow-orange-sm": "0 4px 12px -2px rgba(255, 106, 0, 0.25)",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
