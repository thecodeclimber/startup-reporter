const defaultTheme = require('tailwindcss/defaultTheme')
const materialColors = require('./src/utils/material-colors')

module.exports = {
  purge: false,
  theme: {
    colors: {
      ...materialColors
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    margin: ['responsive', 'first']
  },
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar'
    })
  ]
}
