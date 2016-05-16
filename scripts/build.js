#!/usr/bin/env node

var spawn = require('child_process').spawn;
var bin = require.resolve('webpack/bin/webpack.js');

var path = require('path');
var config = path.resolve(__dirname, '..', 'webpack.config.prod.js');

var argv = process.argv.slice(2);

if (argv[0] === '--config') {
  config = argv[1];
  argv = argv.slice(2);
}

spawn(bin, ['--config', config].concat(argv), { stdio: [0, 1, 2] });
