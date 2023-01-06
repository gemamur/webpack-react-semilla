const base = require("./webpack.base.js");
const { merge } = require("webpack-merge");
const { path } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = merge(base,{
    mode: "production",
    output: {
      filename: "js/[name].[chunkhash].js",
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  exportLocalsConvention: "camelCase",
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    devServer: {
      port: 8080,
      open: true,
      devMiddleware: {
        stats: "errors-only",
      },
    },
    devtool: "eval-source-map",
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[chunkhash].css",
      }),
      new Dotenv({
        path: "./prod.env",
      }),
      ],
  });