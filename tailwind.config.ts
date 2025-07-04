import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes:{
        scroll:{
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll var(--animation-duration, 40s) linear infinite',
      },
      // Here we are extending the default theme with our custom design system.
      colors: {
        // This is your custom color palette.
        // We can now use class names like `bg-primary` or `text-accent-amber`.
        background: {
          cream: '#fefef9',
          gray: '#f8fafc',
        },
        primary: '#1c1c1c', // Warm Black
        secondary: {
          100: '#94a3b8', // Soft Gray 1
          200: '#64748b', // Soft Gray 2
        },
        accent: {
          amber: '#f59e0b', // Warm Amber
          purple: '#8b5cf6', // Soft Purple
        },
        emotional: {
          blue: '#0ea5e9', // Muted Blue for trust
        },
      },
      fontFamily: {
        // This is your custom font selection.
        // We can use class names like `font-sans`, `font-serif`, or `font-handwriting`.
        sans: ['var(--font-source-sans-3)', 'sans-serif'], // For body text
        serif: ['var(--font-crimson-pro)', 'serif'],         // For headers
        handwriting: ['var(--font-caveat)', 'cursive'],        // For quotes/accents
      },
    },
  },
  safelist: ['animate-scroll'],
  plugins: [],
};
export default config; 