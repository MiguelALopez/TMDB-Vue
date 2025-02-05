/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container by default
        padding: '1rem', // Adds default padding
      },
    },
  },
  plugins: [],
};
