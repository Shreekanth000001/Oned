/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'aileron': ['Aileron', 'sans-serif'],
      },
      colors: {
        'light-black': '#21243d',
        'light-gray': '#52556E',
        "light-purple": "#F5F0FE",
        "text-purple": "#9c6af9",
      },
    }
  },
  plugins: [],
}

