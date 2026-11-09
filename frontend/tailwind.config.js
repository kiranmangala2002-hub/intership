/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#faf8ff',
          100: '#f4effe',
          200: '#e9dffa',
          300: '#d7c4f7',
          400: '#bc9cf4',
          500: '#9d71ea',
          600: '#834ee0',
          700: '#6d35c8',
          800: '#52249c',
          900: '#341467',
          950: '#1d073e',
        },
      },
      boxShadow: {
        'lavender-soft': '0 10px 30px -10px rgba(157, 113, 234, 0.25)',
        'lavender-glow': '0 0 25px rgba(157, 113, 234, 0.35)',
        'card-3d': '0 20px 40px -15px rgba(82, 36, 156, 0.12), 0 0 0 1px rgba(215, 196, 247, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"SF Pro"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"SF Pro"', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro"', 'sans-serif'],
        tech: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Mono"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

