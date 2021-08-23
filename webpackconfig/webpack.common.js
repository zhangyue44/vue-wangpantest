const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack'); // webpack内置的插件
const { merge } = require("webpack-merge");

const resolveApp = require("./paths");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const { Module } = require('webpack');

const commonConfig = {
  // context: path.resolve(__dirname, '../'),
  entry: './src/main.js',
  output: {
    path: resolveApp('./dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'],
    alias: {
      "@": resolveApp('./src'),
      "components": resolveApp("./src/components")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // include: resolveApp('./src'),
        // exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less/,
        // include: resolveApp('./src'),
        // exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // include: resolveApp('./src'),
        // exclude: /node_modules/,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      {
        test: /\.ttf|eot|woff2?$/i,
        // include: resolveApp('./src'),
        // exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:6][ext]"
        }
      },
      {
        test: /\.(js|vue)$/,
        include: resolveApp('./src'),
        use: [
          'eslint-loader',
        ],
        enforce: 'pre' // 保证编译前执行
      },
      {
        test: /\.js$/,
        include: resolveApp('./src'),
        // exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.vue$/,
        // include: resolveApp('./src'),
        // exclude: /node_modules/,
        use: "vue-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "wangpan",
      template: "./public/index.html"
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: [
              "**/index.html",
              "**/.DS_Store"
            ]
          }
        }
      ]
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = function(env) {
  const isProduction = env.production;
  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = merge(commonConfig, config);
  return mergeConfig;
}
