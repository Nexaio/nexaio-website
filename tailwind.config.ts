import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexaio: {
          navy: "#0B1F32",
          offwhite: "#F9F9F8",
          gray: "#AAB0B4",
          slate: "#555D66",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
