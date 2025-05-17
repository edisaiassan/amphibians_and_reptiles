/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./src/presentation/pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#3B6939',
        primaryLite: '#BCF0B4',
        primaryHard: '#002204',
        outline: '#72796F',
        outlineLite: '#C2C9BD',
        outlineHard: '#424940',
      },
    },
  },
  plugins: [],
}