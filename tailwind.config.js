const colours = require('./src/assets/colours.jsx').default || require('./src/assets/colours.jsx');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    screens: {
      xs: '320px',
      sm: '380px',
      md: '600px',
      lg: '768px',
      xl: '1024px',
    },
    extend: {
      colors: colours,
      fontFamily: {
        manrope: ['Manrope-Regular'],
        'manrope-extralight': ['Manrope-ExtraLight'],
        'manrope-light': ['Manrope-Light'],
        'manrope-medium': ['Manrope-Medium'],
        'manrope-semibold': ['Manrope-SemiBold'],
        'manrope-bold': ['Manrope-Bold'],
        'manrope-extrabold': ['Manrope-ExtraBold'],
        revalia: ['Revalia-Regular'],
        sans: ['Manrope-Regular'],
      },
    },
  },
  plugins: [],
};
