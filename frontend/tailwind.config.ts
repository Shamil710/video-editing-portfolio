import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#050505",
        velvet: "#0b0b0b",
        champagne: "#E0C36A",
        bullion: "#D4AF37",
      },
      fontFamily: {
        display: [
          '"Clash Display"',
          '"Cabinet Grotesk"',
          '"Satoshi"',
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        body: ["Inter", '"Satoshi"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 24px 90px rgba(212, 175, 55, 0.16)",
        glass:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.38)",
      },
    },
  },
  plugins: [],
} satisfies Config;
