/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(69, 69, 251)',
        accent: 'rgb(215, 164, 11)',
        olive: '#8f9c37',
      },
    },
  },
  plugins: [],
}
