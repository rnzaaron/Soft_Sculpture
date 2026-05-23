/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFB3D9',
          'hot-pink': '#FF69B4',
          'deep-pink': '#D4659A',
          lavender: '#D8BFD8',
          'sky-blue': '#87CEEB',
          'mint': '#98FF98',
          'soft-yellow': '#FFFFE0',
          white: '#FFFFFF',
          'light-gray': '#F5F5F5',
          black: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
