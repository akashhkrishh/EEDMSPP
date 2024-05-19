/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e2e8f0",
        secondary: "#ffffff",
        cblack: "#19181d",
        cgrey: "#ebebeb",
      }
    },
  },
  plugins: [],
}