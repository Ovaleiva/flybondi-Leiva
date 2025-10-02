const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js', // tu archivo principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
    }),
    // Ya no necesitás copy-webpack-plugin para dataset.json
  ],
  devServer: {
  static: {
    directory: path.join(__dirname, 'public'), // ⚡ sirve public/
  },
  compress: true,
  port: 3000,
  open: true,
  historyApiFallback: true,
},
};
// Ahora dataset.json se sirve desde public/ sin necesidad de importarlo