#!/usr/bin/env node

var spawn = require('child_process').spawn;
var bin = require.resolve('webpack-dev-server/bin/webpack-dev-server.js');

var config = __dirname + '/webpack.config.js';
var argv = process.argv.slice(2);

if (argv[0] === '--config') {
  config = argv[1];
  argv = argv.slice(2);
}

spawn(bin, ['--config', config].concat(argv), { stdio: [0, 1, 2] });
