const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    // './app/javascript/**/*.{js,jsx,ts,tsx}',
    './app/views/**/*.{erb,haml,html,slim}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#FF6D2F"
        },
        secondary: {
          DEFAULT: "#FFDACD"
        },
        tertiary: {
          DEFAULT: "#F8F7F6"
        },
        gray: {
          300: "#5d7186",
          400: "#9097a7",
          500: "#242C33"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
