'use strict';

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'production';
}

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require(__dirname + '/webpack.config');

config.devtool = 'source-map';
config.output.filename = '[name].bundle.[chunkhash].js';

const prodPlugins = config.plugins.reduce((total, curr) => {
  if (!(curr instanceof webpack.HotModuleReplacementPlugin)) {
    total.push(curr);
  }

  return total;
}, [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[chunkhash].js'),
  new ExtractTextPlugin('styles.css', '[name].[contenthash].css')
]).concat([
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
]);

config.plugins = prodPlugins;

const prodLoaders = config.module.loaders.reduce((total, curr) => {
  if (curr.loader && curr.loader.indexOf('style-loader') > -1) {
    let data = curr.loader.split('!');
    curr.loader = ExtractTextPlugin.extract('style-loader', data.slice(1).join('!'));
  }

  total.push(curr);
  return total;
}, []);

config.module.loaders = prodLoaders;

module.exports = config;
