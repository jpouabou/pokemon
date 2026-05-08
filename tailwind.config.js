/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#EF4444',
          blue: '#3B82F6',
          yellow: '#FACC15',
        },
      },
      fontFamily: {
        display: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
