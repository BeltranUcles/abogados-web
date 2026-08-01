/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#03152F",      // Azul marino de fondo
          darkLight: "#081d3d", // Azul acero para tarjetas y bordes
          gold: "#C5A059",      // Tu dorado principal
          goldLight: "#e6c687", // Dorado claro para efectos hover
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}