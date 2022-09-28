/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'big-red': '#C61626',
        'alice-blue': '#F3F8FB',
        'harvest-gold': '#EEA821',
        'pink': '#F9CCC3',
        'fire-opal': '#E15B54',
        'sizzling-sunrise': '#FEDA01',
        'ltyellowbg': '#FFE2A9',
      },
      fontFamily: {
        'bangers': ['Bangers'],
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(-5deg)'},
          '50%': { transform: 'rotate(5deg)' },
        },
        grow: {
          '0%, 100%': { transform: 'scale(1)'},
          '50%': { transform: 'scale(1.03)' },
        }
      },
      animation: {
        swing: 'swing 2s ease-in-out infinite',
        grow: 'grow 2s ease-in-out infinite',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
