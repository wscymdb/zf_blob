const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  // entry: ['./src/entry1.js', './src/entry2.js'],
  // entry: {
  //   entry1: './src/entry1.js',
  //   entry2: './src/entry2.js',
  // },
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
    watchFiles: ['src/**/*.js'], // 监听这些文件的变化，如果这些文件变化了，可以重新编译,默认监控所有文件
    // 不管访问那个路径，都会把请求重定向到index.html 交给前端路由来进行处理
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(css)$/,
        // loader: 'css-loader',
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-css.css', // 提取的文件的名称
      chunkFilename: 'css/[name]-chunk.css', // 动态导入的文件是单独分包的，那么如果有动态导入的css文件也会单独分包，这个就是设置分包的名字
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/entry1.html',
    //   filename: 'entry1.html',
    //   chunks: ['entry1'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/entry2.html',
    //   filename: 'entry2.html',
    //   chunks: ['entry2'],
    // }),
  ],
}

process.env.NODE_ENV
/**
 * cross-env 需要安装
 * cross-env NODE_ENV=production
 * 通过cross-env可以跨平台设置环境变量
 * 通过 process.env.NODE_ENV获取  NODE_ENV就是我们自定义的key
 * 
 * 
 ### 3. 处理CSS资源
 
- **css-loader**  
  可以将 CSS 文件中的样式代码转换成 JavaScript 对象，并在 JavaScript 中导出，以便于其他 Loader 或插件进行处理。css-loader 支持 import 和 url() 等方式导入 CSS 文件和资源文件。

- **style-loader**  
  可以将 CSS 样式注入到 Webpack 打包后的 JavaScript 文件中，使得页面能够正确显示样式。它会将 CSS 样式代码插入到页面的 `<style>` 标签中，或以内联样式的方式插入到 `<head>` 标签中。

- **mini-css-extract-plugin**  
  当我们使用 style-loader 将 CSS 样式注入到 JavaScript 文件中时，每次页面加载都会将样式代码包含在 JavaScript 文件中。JavaScript 文件变大，加载速度变慢，降低了页面的性能。  
  为了解决这个问题，可以使用 mini-css-extract-plugin 插件，将 CSS 文件单独提取出来为独立的 CSS 文件，可以在页面加载时并行加载 CSS 文件，避免了 JavaScript 文件变大、加载缓慢的问题。  
  此外，使用独立的 CSS 文件也可以将 CSS 代码和 JavaScript 代码分离，方便维护和修改，提高开发效率。
 */
