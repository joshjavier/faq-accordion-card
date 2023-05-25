module.exports = (config) => {
  config.addPassthroughCopy('src/images')
  config.addPassthroughCopy('src/index.js')

  return {
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
