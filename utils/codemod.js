'use strict';

var utils = require('./codemod-utils');
var overrider = require('./overrider');

module.exports = function transformer(file, api, options, queries) {
  var j = api.jscodeshift;
  var ast = j(file.source);

  overrider(queries, utils.overridePlugin.bind(null, ast, j), utils.overrideProperty.bind(null, ast, j));
  utils.removeOverriderCall(ast, j);

  return ast.toSource({ quote: 'single' });
};
