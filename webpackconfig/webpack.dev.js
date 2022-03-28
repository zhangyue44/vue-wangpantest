const resolveApp = require("./paths");
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devtool: "cheap-module-source-map",
  devServer: {
    useLocalIp: true, // host设置为0.0.0.0时，局部网可以访问，本机又不可以访问本机自己开启的项目,将useLocalIp设置为true就可以访问了
    hot: true,
    host: '0.0.0.0',
    compress: false, // 是否为静态文件开启gzip compression，默认值是false
    open: true,
    port: 7778,  // 端口号
    proxy: {
      "/pan": {
        target: "http://192.168.31.119:8002",
        // target: "http://localhost:8002", // 自己笔记本的ip总是经常变，所以也可以直接用 localhost
        pathRewrite: {
          "^/pan": ""
        },
        secure: false, // 不验证证书，可以接收转发到https的服务器上
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
