const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  // entry: './src/index.js',
  // entry: ['./src/entry1.js', './src/entry2.js'],
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },

  mode: 'development',
  devtool: false,

  devServer: {
    host: 'localhost', // 主机名
    port: 9000, // 访问端口号
    open: true, // 构建结束后自动打开浏览器预览项目
    compress: true, // 启动gzip压缩
    hot: true, // 启动支持模块热替换
    watchFiles: ['src/**/*.js'], // 监听这些文件的变化，如果这些文件变化了，可以重新编译
    // 不管访问那个路径，都会把请求重定向到index.html 交给前端路由来进行处理
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(css)$/,
        // loader: 'css-loader',
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entry1.html',
      filename: 'entry1.html',
      chunks: ['entry1'],
    }),
    new HtmlWebpackPlugin({
      template: './src/entry2.html',
      filename: 'entry2.html',
      chunks: ['entry2'],
    }),
  ],
}
