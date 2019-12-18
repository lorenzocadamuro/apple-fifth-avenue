const webpack = require('webpack')
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/js/',
  resolve: {
    alias: {
      '~js': path.resolve(__dirname, 'src/js'),
      '~css': path.resolve(__dirname, 'src/css'),
      '~glsl': path.resolve(__dirname, 'src/glsl'),
      '~assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      devMode,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
    new CopyPlugin([
      {
        from: './src/static/**/*',
        to: '',
        flatten: true,
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|png|svg|gif|mp4)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
