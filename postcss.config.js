const cssnano = require('cssnano')({
  preset: 'default'
})

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/test/index.html'],

  defaultExtractor: (content) => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
    return broadMatches.concat(innerMatches)
  }
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [cssnano, purgecss] : [])
  ]
}