/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        skyglass: "#ecfeff",
        mint: "#d1fae5",
        coral: "#fecaca",
        sand: "#fef3c7",
      },
      boxShadow: {
        panel: "0 24px 60px rgba(15, 23, 42, 0.14)",
      },
    },
  },
  plugins: [],
};
