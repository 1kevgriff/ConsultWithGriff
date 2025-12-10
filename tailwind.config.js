/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      spacing: {
        80: '20rem',
        108: '27rem',
      },
      borderWidth: {
        14: '14px',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',

      // Background and text colors via CSS variables
      background: {
        primary: 'var(--bg-background-primary)',
        secondary: 'var(--bg-background-secondary)',
        tertiary: 'var(--bg-background-tertiary)',
        form: 'var(--bg-background-form)',
      },
      copy: {
        primary: 'var(--text-copy-primary)',
        secondary: 'var(--text-copy-secondary)',
      },

      // Navy + Gold Design System
      navy: {
        DEFAULT: '#0C1B33', // Deep Navy - primary brand
        light: '#1B3C59', // Azure Steel - secondary
        50: '#F0F4F8',
        100: '#D9E2EC',
        200: '#BCCCDC',
        300: '#9FB3C8',
        400: '#829AB1',
        500: '#627D98',
        600: '#486581',
        700: '#334E68',
        800: '#243B53',
        900: '#1B3C59', // Azure Steel
        950: '#0C1B33', // Deep Navy
      },
      gold: {
        DEFAULT: '#F5C518', // Premium Gold - primary accent
        warm: '#FFB400', // Amber Gold - warm accent
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FFB400', // Amber Gold
        500: '#F5C518', // Premium Gold
        600: '#D4A017',
        700: '#B8860B',
        800: '#9A7209',
        900: '#7C5E08',
      },

      // Updated neutral gray palette
      gray: {
        50: '#F8F9FA', // Background Light
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#3F4752',
        800: '#1F2937',
        900: '#111827', // Text Dark
      },

      // Utility colors (minimal use)
      success: '#16A34A',
      warning: '#FACC15',
      error: '#DC2626',
      info: '#2563EB',
    },
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      md: '10px',
      lg: '12px', // Card radius
      xl: '14px', // Button radius
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 4px 12px rgba(0, 0, 0, 0.08)', // Card shadow
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 6px 20px rgba(0, 0, 0, 0.12)', // Hover shadow
      xl: '0 10px 25px -3px rgba(0, 0, 0, 0.15)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      gold: '0 4px 12px rgba(245, 197, 24, 0.3)', // Gold glow
      'gold-lg': '0 8px 24px rgba(245, 197, 24, 0.4)', // Larger gold glow
      none: 'none',
    },
  },
  plugins: [],
};
