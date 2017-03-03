var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  module: {
    loaders: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            //presets: ["es2015"],
            //plugins: ["transform-runtime"]
        }
    ]
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
        'electron'
    ])
  ]
}