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
          '25%': { transform: 'translate(-3px, 3px)' }, // Small move bottom-left
          '50%': { transform: 'translate(3px, -3px)' }, // Small move top-right
          '75%': { transform: 'translate(-3px, 3px)' }, // Small move bottom-left again
        }        
      },
      animation: {
        wobble: 'wobble 0.6s ease',
      },
    },
  },
  plugins: [],
}