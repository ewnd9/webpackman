#!/usr/bin/env node

'use strict';

const spawn = require('child_process').spawn;
const bin = require.resolve('webpack-dev-server/bin/webpack-dev-server.js');

const path = require('path');

let config = path.resolve(__dirname, '..', 'webpack.config.js');
let argv = process.argv.slice(2);

if (argv[0] === '--config') {
  config = argv[1];
  argv = argv.slice(2);
}

spawn(bin, ['--config', config].concat(argv), { stdio: [0, 1, 2] });
