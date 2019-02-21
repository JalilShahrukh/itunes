const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
  entry: './src/index.js', 
  output: { 
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', 
    filename: 'bundle.js'
  },
  devServer: { 
    contentBase: "./build",
  }, 
  module: { 
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html')
    }),
  ]
}