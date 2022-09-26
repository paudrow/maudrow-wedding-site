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
        }
      },
      animation: {
        swing: 'swing 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
