const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        bebasNeue: ["Bebas Neue", "sans-serif"],
        libreFranklin: ["Libre Franklin", "sans-serif"],
        archivoBlack: ["Archivo Black", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme, e }) {
      const colors = theme('colors');
      const strokeUtilities = Object.entries(colors).reduce((acc, [colorName, colorValue]) => {
        if (typeof colorValue === 'string') {
          // For flat color definitions
          acc[`.text-stroke-${e(colorName)}`] = {
            '-webkit-text-stroke': `3px ${colorValue}`,
            '-webkit-text-fill-color': 'transparent',
          };
        } else if (typeof colorValue === 'object') {
          // For nested color definitions (e.g., red-500, blue-600)
          Object.entries(colorValue).forEach(([shade, value]) => {
            acc[`.text-stroke-${e(colorName)}-${shade}`] = {
              '-webkit-text-stroke': `3px ${value}`,
              '-webkit-text-fill-color': 'transparent',
            };
          });
        }
        return acc;
      }, {});

      addUtilities(strokeUtilities, ['responsive', 'hover']);
    }),
  ],
};
