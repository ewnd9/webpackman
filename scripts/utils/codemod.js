'use strict';

const utils = require('./codemod-utils');
const overrider = require('./overrider');

module.exports = function transformer(file, api, options, queries) {
  const j = api.jscodeshift;
  const ast = j(file.source);

  overrider(queries, utils.overridePlugin.bind(null, ast, j), utils.overrideProperty.bind(null, ast, j));
  utils.removeOverriderCall(ast, j);

  return ast.toSource({ quote: 'single' });
};
