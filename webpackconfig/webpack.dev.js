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
        target: "http://192.168.31.119:8002",
        // target: "http://localhost:8002", // 自己笔记本的ip总是经常变，所以也可以直接用 localhost
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
