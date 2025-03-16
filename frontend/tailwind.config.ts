import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        'gray-700/20': 'rgba(55, 65, 81, 0.2)',
        'gray-600/30': 'rgba(75, 85, 99, 0.3)',
        'gray-600/40': 'rgba(75, 85, 99, 0.4)',
      }
    },
  },
  plugins: [],
} satisfies Config;
