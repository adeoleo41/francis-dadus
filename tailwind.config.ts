import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9ed',
          100: '#f9f0cc',
          200: '#f2de94',
          300: '#e9c75a',
          400: '#e0b132',
          500: '#C9A84C', // PRIMARY GOLD
          600: '#B8943F',
          700: '#9a7a32',
          800: '#7d622b',
          900: '#6a5226',
          950: '#3d2e13',
        },
        charcoal: {
          50:  '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#1A1A1A',
        },
        navy: {
          50:  '#edf0fb',
          100: '#d0d9f2',
          200: '#99ade0',
          300: '#6080c8',
          400: '#3a5cad',
          500: '#254494',
          600: '#1d3880',
          700: '#162d6b',
          800: '#0f2355',
          900: '#0a1a40',
          950: '#071330', // PRIMARY NAVY
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #f2de94 50%, #C9A84C 100%)',
        'navy-gradient': 'linear-gradient(135deg, #071330 0%, #0f2355 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
