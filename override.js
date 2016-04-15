'use strict';

var argv = require('minimist')(process.argv.slice(2));
var config = require(__dirname + '/webpack.config.js');
var overrideConfigProperties = require('./utils/override-config-properties');

if (argv['x-replace']) {
  var replacementArray = Array.isArray(argv['x-replace']) ? argv['x-replace'] : [argv['x-replace']];
  overrideConfigProperties(config, replacementArray);
}

console.log(config);
