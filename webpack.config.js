'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var argv = require('minimist')(process.argv.slice(2));
var cwd = process.cwd();

var config = {
  entry: {
    app: path.join(cwd, 'src/index.js'),
    vendors: []
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    path: path.join(cwd, 'dist'),
    publicPath: '/'
  },
  resolve: {
    root: [
      path.join(cwd, 'src'),
      path.join(cwd, 'node_modules'),
    ],
    moduleDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        exclude: /components/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.css$/,
        include: /components/,
        loader: 'style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.gif$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'file-loader' },
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(cwd, 'src/index.html'),
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        APP_ENV: JSON.stringify('browser')
      },
    })
  ],
  postcss: function(webpack) {
    return [
      require('autoprefixer'),
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('postcss-cssnext')
    ];
  },
  devServer: {
    contentBase: path.join(cwd, 'dist'),
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true
  }
};

require('./utils/override-config-properties')(config, argv['x-replace']);
module.exports = config;

/*
x wserve --x-replace="entry.app=./frontend/app.js" --x-replace="plugins.HtmlWebpackPlugin.template=./frontend/index.html --x-replace="output.path=./public"
*/
