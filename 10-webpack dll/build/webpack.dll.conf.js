const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    gfDll: ['gf','demo']
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].dll.[chunkhash].js',
    library: '[name]'
  },
  resolve: {
    alias: {
      'gf': path.resolve(__dirname, '../npm/gf.js'),
      'demo': path.resolve(__dirname, '../npm/demo.js'),
    }
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]'
    }),
  ]
}
