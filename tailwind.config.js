/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        strategy: '#A5B4FC', // Indigo 300
        research: '#5EEAD4', // Teal 300
        infrastructure: '#CBD5E1', // Slate 300
        dissemination: '#FDBA74', // Orange 300
      }
    },
  },
  plugins: [],
}
