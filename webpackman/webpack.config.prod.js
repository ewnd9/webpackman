var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require(__dirname + '/webpack.config');

config.devtool = 'source-map';
config.output.filename = '[name].bundle.[hash].js';

var prodPlugins = config.plugins.reduce((total, curr) => {
  if (!(curr instanceof webpack.HotModuleReplacementPlugin)) {
    total.push(curr);
  }

  return total;
}, [
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('styles.css', '[name].[contenthash].css')
]).concat([
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
]);

config.plugins = prodPlugins;

var prodLoaders = config.module.loaders.reduce((total, curr) => {
  if (curr.loaders && curr.loaders[0] === 'style-loader') {
    curr.loader = ExtractTextPlugin.extract.apply(ExtractTextPlugin, curr.loaders);
    curr.loaders = undefined;
  }

  total.push(curr);
  return total;
}, []);

config.module.loaders = prodLoaders;

module.exports = config;
