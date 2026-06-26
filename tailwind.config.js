/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e0f9ff',
          100: '#b3f0ff',
          200: '#80e5ff',
          300: '#4ddbff',
          400: '#26d1ff',
          500: '#00B8DB',
          600: '#0095AA',
          700: '#007080',
          800: '#004c55',
          900: '#00282b',
        },
        navy: {
          50: '#e8eaf0',
          100: '#c5cade',
          200: '#9fa7c8',
          300: '#7985b2',
          400: '#5d6ba2',
          500: '#1C3A8A',
          600: '#16306e',
          700: '#102652',
          800: '#0a1c36',
          900: '#04101a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
