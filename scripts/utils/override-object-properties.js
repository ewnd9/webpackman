'use strict';

var path = require('path');
var cwd = process.cwd();

var overrider = require('./overrider');

module.exports = function(config, queries) {
  if (!queries) {
    var argv = require('minimist')(process.argv.slice(2))['x-override'] || [];
    queries = Array.isArray(argv) ? argv : [argv];
  }

  overrider(queries, overridePlugin.bind(null, config), overrideProperty.bind(null, config));
};

function overridePlugin(config, plugin, property, value, str) {
  var pluginObj = config.plugins.find(p => Object.getPrototypeOf(p).constructor.name === plugin);

  if (plugin === 'HtmlWebpackPlugin') {
    pluginObj.options[property] = getValue(value);
  } else {
    throw new Error(pluginFnName + ' overriding is not avaliable right now')
  }
}

function overrideProperty(config, path, value, str) {
  var curr = config;
  var last = path[path.length - 1];

  path
    .slice(0, path.length - 1)
    .forEach(function(part) {
      if (curr[part]) {
        curr = curr[part];
      } else {
        throw new Error('"' + str + '" not found in config');
      }
    });

  if (curr[last]) {
    curr[last] = getValue(value);
  } else {
    throw new Error('"' + str + '" not found in config');
  }
}

function getValue(value) {
  if (value.indexOf('./') === 0) {
    return path.resolve(cwd, value);
  } else if (value.indexOf('[') === 0) {
    return value.slice(1, value.length - 1).split(',');
  } else {
    return value;
  }
}
