const path              = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin        = require("copy-webpack-plugin");


const config = {
  entry: "./src/js/app.js",

  output: {
    path:  path.resolve(__dirname, "../dist"),
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },

      {
        test: /\.(json|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "fonts/[name][ext]"
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),

    new CopyPlugin({ 
      patterns: [{
        from: "src/imgs/**/*",
      }]
    })
  ]
};


module.exports = config