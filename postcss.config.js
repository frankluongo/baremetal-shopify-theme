const purgecss = require('@fullhuman/postcss-purgecss')
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

module.exports = {
  parser: "postcss-scss",
  plugins: [
    postcssImport,
    postcssPresetEnv,
    cssnano,
    // purgecss({
    //   content: ['./src/**/*.liquid']
    // })
  ],
};
