const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports={
  mode: 'development',
  entry: path.resolve(__dirname,'./src/app.js'),
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    historyApiFallback: true,
    port:3000,
    hot:true,
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.(sass|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },{
      test: /\.(jpg|png|svg|gif|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        },
      }]}],
  },
  plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname,'./src/index.html')}),
   new CleanWebpackPlugin()]
}