const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackSimpleIncludePlugin = require("html-webpack-simple-include-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const fs = require("fs");

module.exports={
  //Режим проекта и точка входа
  mode: 'development',
  entry: path.resolve(__dirname,'./src/main.js'),
  //Оптимизация svg imagemin
  optimization: {
    runtimeChunk: 'single',
    minimizer: [new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options:{plugins: [["svgo",{plugins:[{removeViewBox:false}]}]
    ]}}})]
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
            additionalData: '@import "src/sass/_variables.sass"',
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
    new HtmlWebpackSimpleIncludePlugin([
        {tag: '<header-block/>',content: fs.readFileSync(path.resolve(__dirname,'./src/html/header.html'))},
        {tag: '<choose-your-tour/>',content: fs.readFileSync(path.resolve(__dirname,'./src/html/chooseYourTour.html'))},
        {tag: '<build-your-tour/>',content: fs.readFileSync(path.resolve(__dirname,'./src/html/buildYourTour.html'))},
        {tag: '<tour-review/>',content: fs.readFileSync(path.resolve(__dirname,'./src/html/tourReviews.html'))},
        {tag: '<tour-photos/>',content: fs.readFileSync(path.resolve(__dirname,'./src/html/tourPhotos.html'))},
        {tag: '<tour-history/>',content: fs.readFileSync(path.resolve(__dirname,'./src/html/tourHistory.html'))},
        {tag: '<footer-and-cta/>',content: fs.readFileSync(path.resolve(__dirname,'./src/html/footerAndCta.html'))},
        ]),
   new CleanWebpackPlugin()]
}