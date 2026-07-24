/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbase: '#1A000A',
        darkcard: '#2B0013',
        maroon: '#760031',
        crimson: '#D51C39',
        peach: '#FF6060',
        summergold: '#FEEC41',
      }
    },
  },
  plugins: [require("daisyui")],
  
  daisyui: {
    themes: [
      {
        studynookTheme: {
          "primary": "#D51C39",          /* Vibrant Red - Buttons & Main Highlights */
          "primary-content": "#ffffff",  
          "secondary": "#FF6060",        /* Peach/Coral - Secondary Actions & Badges */
          "secondary-content": "#ffffff",
          "accent": "#FEEC41",           /* Summer Gold - Price Tags & Highlights */
          "accent-content": "#1A000A",   /* Dark Text on Gold Accent */
          "neutral": "#3B0018",          /* Deep Dark Maroon - Footer & Cards */
          "neutral-content": "#ffffff",
          "base-100": "#1A000A",         /* Rich Dark Main Background */
          "base-200": "#2B0013",         /* Dark Card & Modal Background */
          "base-300": "rgba(255, 96, 96, 0.25)", /* Soft Glowing Border for clear visibility */
          "base-content": "#FFE1E5",     /* Soft Light Text for High Readability */
          "info": "#D51C39",
          "success": "#10B981",
          "warning": "#FEEC41",
          "error": "#D51C39",
        },
      },
      "dark",
      "light"
    ],
  },
};