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
      screens: {
      sm: "500px",   // new mobile breakpoint
      md: "900px",   // slightly higher than default 768px
      lg: "1100px",  // adjust as needed
      xl: "1400px",
      "2xl": "1600px",
    },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
