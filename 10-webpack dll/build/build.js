'use strict'
process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')

webpack({
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'gf': path.resolve(__dirname, '../npm/gf.js'),
      'demo': path.resolve(__dirname, '../npm/demo.js'),
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('../dll/gfDll-manifest.json')
    }),
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
},(err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.toString({ colors: true }));
    process.exit(1);
  }
  console.log('Build completed successfully.');
})