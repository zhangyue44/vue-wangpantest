const resolveApp = require("./paths");
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    compress: true,
    open: true,
    proxy: {
      "/pan": {
        target: "http://192.168.239.86:8002",
        pathRewrite: {
          "^/pan": ""
        },
        secure: false,
        changeOrigin: true
      }
    },
    // historyApiFallback: true
    historyApiFallback: {
      rewrites: [
        {from: /abc/, to: "/index.html"}
      ]
    }
  },
  plugins: [
    new HotModuleReplacementPlugin({})
  ]
}
