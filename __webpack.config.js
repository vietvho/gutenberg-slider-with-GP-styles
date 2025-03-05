const path = require('path');

module.exports = {
  entry: {
    editor: './src/index.js',
    frontend: './src/frontend.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production'
};
