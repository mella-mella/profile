/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#11110F',
          secondary: '#171714',
          card:      '#1D1C18',
          elevated:  '#25231E',
        },
        accent: {
          primary:   '#D9A066',   // copper
          secondary: '#E8C79A',  // pale amber
          muted:     '#A8784A',  // deep copper
          glow:      '#C68A48',  // warm amber
        },
        text: {
          primary:   '#F3EFE7',
          secondary: '#B9B2A7',
          muted:     '#8C867D',
        },
        border: {
          subtle: 'rgba(232,199,154,0.13)',
          warm:   'rgba(217,160,102,0.45)',
        },
        // Keep legacy 'blue' tokens so any component still using
        // them compiles without error; values now point to the warm palette
        blue: {
          primary:   '#D9A066',
          secondary: '#E8C79A',
          light:     '#E8C79A',
          muted:     '#A8784A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer':    'shimmer 2s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift':      'drift 12s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%':      { transform: 'translateY(-6px) translateX(4px)' },
          '66%':      { transform: 'translateY(4px) translateX(-3px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(217,160,102,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(217,160,102,0.025) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
