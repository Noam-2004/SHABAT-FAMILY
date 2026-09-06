/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fbf6ea',
        ink: '#20281f',
        turquoise: '#0aa7a0',
        ocean: '#1c7fb5',
        green: '#33a06a',
        mango: '#ffb238',
        orange: '#ff8a3d',
        coral: '#ff6f5e',
        pink: '#ff8fb8',
        lavender: '#9b7ff0',
        sand: '#ffe3b0',
      },
      fontFamily: {
        sans: ['Rubik', 'Arial Hebrew', 'sans-serif'],
      },
      borderRadius: {
        lg2: '22px',
        xl2: '30px',
      },
    },
  },
  plugins: [],
};
