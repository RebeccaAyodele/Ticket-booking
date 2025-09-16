/* @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        fontFamily: {
          notoserif: ["Noto Serif", "serif"],
          road: ['"Road Rage"', "cursive"],
          times: ['"Times New Roman"', "Times", "serif"],
          oswald: ["Oswald", "serif"],
        },
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
