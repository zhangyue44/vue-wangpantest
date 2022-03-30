const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // css抽离
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css代码压缩，去除无用的空格等
const TerserPlugin = require('terser-webpack-plugin'); // 压缩丑化 js 代码
// const PurgeCssPlugin = require('purgecss-webpack-plugin'); // 删除未使用的CSS
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require('webpack');
const glob = require('glob');
const resolveApp = require("./paths");

module.exports = {
  mode: "production",
  optimization: {
    usedExports: true, // 通过标记某些函数是否被使用，之后通过Terser来进行优化
    minimize: true, // 对js代码进行压缩，默认production模式下已经打开了
    minimizer: [
      // 由Terser将未使用的函数, 从我们的代码中删除
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,  // 打包时去掉注释
          },
          compress: {
            arguments: false,
            dead_code: true,
            pure_funcs: ['console.log']  // 打包时清除掉无用的console.log
          },
          mangle: true,
          toplevel: true,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css"
    }),
    new CssMinimizerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new PurgeCssPlugin({
    //   // 检测src文件夹下的所有文件夹中的所有文件，这是glob库中的固定写法
    //   // {nodir: true} 表示不检测文件夹，只检测文件
    //   paths: glob.sync(`${resolveApp("./src")}/**/*`, {nodir: true}),
    //   safelist: function() {
    //     return {
    //       standard: ["body", "html"]  // 保留html和body的样式
    //     }
    //   }
    // }),
    new CompressionPlugin({
      test: /\.(css|js)$/i,
      threshold: 0,
      minRatio: 0.8,
      algorithm: "gzip",
    }),
    new BundleAnalyzerPlugin({analyzerPort:7777})
  ]
}
