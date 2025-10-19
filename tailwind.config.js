/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
        terminal: ['"VT323"', 'monospace'],
      },
      colors: {
        desktop: {
          sky: '#1a1f2e',
          dusk: '#141827',
          glow: '#ffd67f',
          mint: '#7efaea',
          lilac: '#b3a6ff',
          rose: '#ff9ac9',
          amber: '#ffb86c',
          noir: '#0e101a',
          shell: '#262c41',
          highlight: '#2f3652',
          bubble: '#f8b4ff',
          blush: '#ffc6e1',
          haze: '#8ab8ff',
        },
      },
      boxShadow: {
        crt: '0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(10,14,30,0.55)',
        bezel: 'inset 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 4px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        scanlines: 'linear-gradient(rgba(255,255,255,0.04) 0.5px, transparent 0.5px)',
        'pixel-grid': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      animation: {
        'icon-bounce': 'icon-bounce 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'icon-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.45 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
}
