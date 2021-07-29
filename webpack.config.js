const path = require('path')
const themeURL = 'http://questions.loc'
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BSyncWebpackPlugin = require('browser-sync-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

console.log('IS_PROD:', isProd)
console.log('IS_DEV:', isDev)

const filename = (filename, ext) => isDev
  ? `${filename}.${ext}`
  : `${filename}.[hash].min.${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      }
    }
  ]
  if (isDev) {loaders.push('eslint-loader')}
  return loaders
}

const webpackConfig = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './js/index.js'],
  devtool: isDev ? 'source-map' : false,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `js/${filename('bundle', 'js')}`
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      }
    ]
  },

  plugins: [
    new BSyncWebpackPlugin({
      proxy: themeURL
    }),
    new MiniCssExtractPlugin({
      filename: `css/${filename('style', 'css')}`,
    }),
    new HTMLWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img')
        }
      ]
    }),
    new CleanWebpackPlugin()
  ]
}

module.exports = webpackConfig