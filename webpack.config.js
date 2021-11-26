const path = require('path');

module.exports = {
  entry: './start/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};
