
const { cssExtract } = require("./plugins");

exports.babelLoader = () => {
  return {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
          "@babel/plugin-proposal-object-rest-spread",
          [
            "module-resolver",
            {
              root: ["./"],
              alias: {
                "@components": "./src/assets/scripts/components",
                "@context": "./src/assets/scripts/context",
                "@lib": "./src/assets/scripts/lib",
                "@hooks": "./src/assets/scripts/hooks",
              },
            },
          ],
        ],
      },
    },
  };
};

exports.cssLoader = (env) => {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: cssExtract().loader,
        options: {
          hmr: env === "development",
        },
      },
      "css-loader",
      "postcss-loader",
      "sass-loader",
    ],
  };
};
