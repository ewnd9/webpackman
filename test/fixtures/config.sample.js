'use strict';

var path = require('path');
var cwd = process.cwd();

var config = {
  entry: {
    app: path.join(cwd, 'src/index.js')
  },
  output: {
    path: path.join(cwd, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(cwd, 'src/index.html'),
      inject: 'body'
    })
   ]
};

require('./utils/override-config-properties')(config, argv['x-replace']);
module.exports = config;
