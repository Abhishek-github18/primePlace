/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '15%, 45%, 75%': { transform: 'translate(-10px, 10px)' }, // Move bottom-left
          '30%, 60%': { transform: 'translate(10px, -10px)' }, // Move top-right
        },
      },
      animation: {
        wobble: 'wobble 0.6s ease',
      },
    },
  },
  plugins: [],
}