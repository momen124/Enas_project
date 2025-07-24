/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary: Egyptian Blue (refined for better contrast and luxury)
        'egyptian-blue': {
          50: '#e6f0ff', // Slightly darker for better contrast
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#1e6ad6', // Primary shade, rich and elegant
          600: '#1957b3',
          700: '#144490',
          800: '#10346e',
          900: '#0c244b',
          950: '#081632',
        },
        // Accent: Gold Accent (softer, more elegant gold tones)
        'gold-accent': {
          50: '#fff7e6',
          100: '#ffedcc',
          200: '#ffdb99',
          300: '#ffca66',
          400: '#ffb833',
          500: '#f5a623', // Primary gold, softer and more luxurious
          600: '#d98c1d',
          700: '#b37318',
          800: '#8c5913',
          900: '#66400e',
          950: '#402809',
        },
        // Secondary Accent: Nile Teal (evokes Nile River freshness)
        'nile-teal': {
          50: '#e6fffa',
          100: '#ccfff5',
          200: '#99ffeb',
          300: '#66ffe1',
          400: '#33ffd7',
          500: '#00e6b8', // Primary teal, vibrant yet calming
          600: '#00b395',
          700: '#008072',
          800: '#004d4e',
          900: '#00332b',
          950: '#001a18',
        },
        // Neutral: Sand Beige (evokes Egyptian deserts, for backgrounds)
        'sand-beige': {
          50: '#fff8f0',
          100: '#f9efe4',
          200: '#f3e3d0',
          300: '#edd6bc',
          400: '#e7c9a8',
          500: '#e0bc94', // Primary beige, warm and soft
          600: '#c8a783',
          700: '#b09262',
          800: '#987c42',
          900: '#806621',
          950: '#684f11',
        },
        // Neutral: Cream White (expanded for flexibility)
        'cream-white': {
          50: '#fffefa',
          100: '#fefcf5',
          200: '#fdf9eb',
          300: '#fbf5e1',
          400: '#faf2d7',
          500: '#f8eed0', // Primary cream, soft and luxurious
          600: '#e0d6b8',
          700: '#c8bea0',
          800: '#b0a688',
          900: '#988e70',
          950: '#807658',
        },
        // Neutral: Soft Gray (expanded for text and UI)
        'soft-gray': {
          50: '#f9fafb',
          100: '#f1f2f3',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280', // Primary gray, versatile for text
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0f1a',
        },
        // Dark: Deep Navy (expanded for dark themes)
        'deep-navy': {
          50: '#e6e9ee',
          100: '#ccd3dc',
          200: '#99a7ba',
          300: '#667b97',
          400: '#335075',
          500: '#0f263e', // Primary navy, rich and elegant
          600: '#0c1f33',
          700: '#091828',
          800: '#06121e',
          900: '#030c14',
          950: '#02080d',
        },
        // Neutral: Warm Gray (expanded for warmth)
        'warm-gray': {
          50: '#f8f9f9',
          100: '#f0f1f2',
          200: '#dfe1e4',
          300: '#ced0d5',
          400: '#bcbfc6',
          500: '#aaadb4', // Primary warm gray, subtle and sophisticated
          600: '#989ba2',
          700: '#858890',
          800: '#72757e',
          900: '#60636c',
          950: '#4e5159',
        },
      },
      fontFamily: {
        'arabic': ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
        'english': ['Inter', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'zoom-in': 'zoomIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};