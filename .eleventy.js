const markdownIt = require('markdown-it')

module.exports = (config) => {
  config.addPassthroughCopy('src/images')
  config.addPassthroughCopy('src/index.js')

  // Add filter to transform markdown to HTML
  config.addFilter('markdown', (content) => {
    return new markdownIt({ html: true }).render(content)
  })

  return {
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
