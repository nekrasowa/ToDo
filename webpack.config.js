const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: './start/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            use: ['source-map-loader'],
        },
    ],
}
};
