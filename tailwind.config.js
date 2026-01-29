/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/config/colors');
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily: {
        'poppins-regular': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-bold': ['Poppins_700Bold'],
      },
    },
  },
  plugins: [],
};
