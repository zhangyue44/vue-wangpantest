const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取到一个独立的css文件中
const { DefinePlugin } = require('webpack'); // webpack内置的插件
const { merge } = require("webpack-merge");

const resolveApp = require("./paths");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

const commonConfig = (isProduction) => {
  return {
    entry: './src/main.js',
    output: {
      path: resolveApp('./dist'),
      // filename: 'bundle.js',
      filename: "js/[name].[chunkhash:6].bundle.js",
      chunkFilename: "js/[name].[contenthash:6].chunk.js",
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'],
      alias: {
        "@": resolveApp('./src'),
        "components": resolveApp("./src/components")
      }
    },
    optimization: {
      splitChunks: {
        chunks: "all",  // all 异步/同步导入
        minSize: 20000, // 最小尺寸: 如果拆分出来一个, 那么拆分出来的这个包的大小最小为minSize
        maxSize: 20000,  // 将大于maxSize的包, 拆分成不小于minSize的包
        minChunks: 1,  // minChunks表示引入的包, 至少被导入了几次
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            filename: "js/[id]_vendors.js",
            // name: "vendor-chunks.js",
            priority: -10
          },
          default: {
            minChunks: 2,
            filename: "common_[id].js",
            priority: -20
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          // include: resolveApp('./src'),
          // exclude: /node_modules/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader: "style-loader", // style-loader最好只在开发环境使用
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
            isProduction ? MiniCssExtractPlugin.loader: "style-loader",
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
          test: /\.sass$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader: "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true,
                // sass-loader version >= 8
                sassOptions: {
                  indentedSyntax: true
                }
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader: "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            'sass-loader',
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
          // include: resolveApp('./src'), 就在这里变了
          exclude: /node_modules/,
          use: [
            'eslint-loader',
          ],
          enforce: 'pre' // 保证编译前执行
        },
        {
          test: /\.js$/,
          // include: resolveApp('./src'), 就在这里变了，我觉得就应该使用 exclude
          exclude: /node_modules/,
          use: ['babel-loader']
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
        template: "./public/index.html",
        cache: true, // 当文件没有发生任何改变时, 直接使用之前的缓存
        minify: isProduction ? {
          removeComments: false, // 是否要移除注释
          removeRedundantAttributes: false, // 是否移除多余的属性
          removeEmptyAttributes: true, // 是否移除一些空属性
          collapseWhitespace: false,
          removeStyleLinkTypeAttributes: true,
          minifyCSS: true,
          minifyJS: {
            mangle: {
              toplevel: true
            }
          }
        }: false
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
}

module.exports = function(env) {
  const isProduction = env.production;
  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = merge(commonConfig(isProduction), config);
  return mergeConfig;
}
