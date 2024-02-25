/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Blue': '#2d388a'
      },
      fontFamily: {
        Turret: ['Turret Road'],
        Sarabun: ['Sarabun'],
        Nunito: ['Nunito'],
        AlfaSlabOne: ['Alfa Slab One']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}