/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#ffffff",
          'orange': "hsl(28, 100%, 52%)",
          'blue-500':" hsl(233, 67%, 56%)",
          'blue-700': "hsl(248, 70%, 36%)",
          'neutral-0': "hsl(0, 0%, 100%)",
          'neutral-200':" hsl(250, 6%, 84%)",
          'neutral-300': "hsl(240, 6%, 70%)",
          'neutral-600': "#3C3A5F",
          'neutral-700': "#25253F",
          'neutral-800': "#2F2F49",
          'neutral-900': "#02012B",        
      },
    },
  },
  plugins: [],
}