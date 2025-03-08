import { resolve as _resolve } from 'path';
import defaultConfig, { module as _module } from '@wordpress/scripts/config/webpack.config';

export default {
  ...defaultConfig,
  entry: './src/index.tsx',
  output: {
    path: _resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  module: {
    ..._module,
    rules: [
      ..._module.rules,
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};