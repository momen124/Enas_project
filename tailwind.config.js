/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          600: 'var(--primary-600)',
          800: 'var(--primary-800)',
        },
        text: {
          primary: 'var(--text-color)',
          secondary: 'var(--secondary-text-color)',
        },
        card: {
          DEFAULT: 'var(--card-bg-color)',
          hover: 'var(--hover-bg-color)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
        },
        success: {
          500: 'var(--success-500)',
          600: 'var(--success-600)',
        },
        error: {
          500: 'var(--error-500)',
          600: 'var(--error-600)',
        },
        warning: {
          400: 'var(--warning-400)',
        },
        neutral: {
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
        background: {
          DEFAULT: 'var(--background-color)', // Added for main background
        },
        secondary: {
          500: 'var(--secondary-500)', // Added for CategorySection hover
        },
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        medium: 'var(--shadow-medium)',
        glow: 'var(--shadow-glow)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};