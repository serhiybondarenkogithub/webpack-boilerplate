const common               = require("./webpack.common.config.js");
const { merge }            = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin");
const path                 = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "js/[name].js"
    // filename: "js/[name].[contenthash:12].js"
  },

  optimization: {
    minimize: true,

    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),

      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 50,
              },
            },
          },
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader" ]
      },

      {
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader" ],
      },

      {
        test: /\.(png|jpg|svg|json)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10 kb
          }
        },
        generator: {
          filename: "./images/[name].[ext]"
          // filename: "./images/[name].[contenthash:12][ext]"
        },
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      // filename: "css/[name].[contenthash:12].css",
    })
  ]
})
