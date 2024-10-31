/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/views/**/*.{html,js}',
    './src/js/**/*.{html,js}',
    './src/components/**/*.{html,js}',
    '!./node_modules/**',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
