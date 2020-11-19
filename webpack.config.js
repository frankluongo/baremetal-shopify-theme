const path = require("path");
const { babelLoader, cssLoader, copyFiles, cssExtract, entry } = require("./webpack");

module.exports = (env) => {
  const mode = env.production ? 'production' : 'development';
  return {
    mode,
    entry,
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist/assets"),
    },
    module: {
      rules: [babelLoader(), cssLoader(mode)],
    },
    plugins: [
      copyFiles(__dirname),
      cssExtract().plugin,
    ],
    resolve: {
      fallback: {
        // "url": false
        "url": require.resolve("url")
      }
    },
  };
};
