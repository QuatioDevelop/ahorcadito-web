/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#080604',
        deep: '#0f0c09',
        surface: '#1a1510',
        elevated: '#231d16',
        'card-bg': '#1e1812',
        gold: {
          dim: '#7a5918',
          DEFAULT: '#c08a25',
          bright: '#e5ab40',
        },
        crimson: {
          DEFAULT: '#8b1a1a',
          bright: '#c0392b',
        },
        emerald: {
          dim: '#1e4a35',
          DEFAULT: '#2d6a4f',
          bright: '#40916c',
        },
        ink: {
          DEFAULT: '#ede0c8',
          dim: '#b0a090',
          muted: '#6e6050',
          faint: '#3a3028',
        },
        rope: '#6b4c1e',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        body: ['EB Garamond', 'Georgia', 'serif'],
        stamp: ['Special Elite', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
