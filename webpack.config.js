const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports={
  //Режим проекта и точка входа
  mode: 'development',
  entry: path.resolve(__dirname,'./src/main.js'),
  optimization: {
    runtimeChunk: 'single',
  },
  //Настройки сервера
  devServer: {
    watchFiles: [path.resolve(__dirname,"src")],
    historyApiFallback: true,
    port:3000,
    hot:true,
  },
  //Выходной main файл
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        //Компиляция из sass в css
        test: /\.(sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', {
          loader: 'sass-loader',
          options: {
            //Файл с переменными и миксинами
            additionalData: '@import "src/sass/_variablesAndGlobal.sass"',
          }},]
      },{
      //Обработка картинок, иконок, svg
      test: /\.(jpg|png|svg|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path]/[name].[ext]'
        }},
        {// Оптимизация всех изображений
        loader: "webp-loader",
        options: {
          quality: 75
        }
      }
      ]}],
  },
  plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname,'./src/index.html')}),
   new CleanWebpackPlugin()]
}