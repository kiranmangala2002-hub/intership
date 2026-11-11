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
        midnight: {
          900: '#070a14',
          800: '#0c1222',
          700: '#121b33',
          600: '#182444',
        },
        neon: {
          cyan: '#00f0ff',
          violet: '#a855f7',
          blue: '#3b82f6',
        }
      },
      boxShadow: {
        'lavender-soft': '0 10px 30px -10px rgba(157, 113, 234, 0.25)',
        'lavender-glow': '0 0 25px rgba(157, 113, 234, 0.35)',
        'card-3d': '0 20px 40px -15px rgba(82, 36, 156, 0.12), 0 0 0 1px rgba(215, 196, 247, 0.4)',
        'jarvis-glow': '0 0 30px rgba(56, 189, 248, 0.28), 0 15px 35px rgba(124, 58, 237, 0.18)',
        'holo-3d': '0 20px 45px -10px rgba(124, 58, 237, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.85) inset, 0 1px 3px rgba(0, 0, 0, 0.05)',
        'button-3d': '0 8px 20px -4px rgba(124, 58, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
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

