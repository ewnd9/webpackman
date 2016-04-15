'use strict';

var clone = require('clone');
var replaceScripts = require('./utils/replace-pkg-scripts');

var pkg0 = require(process.cwd() + '/package.json');
var old = clone(pkg0);

var result = replaceScripts(pkg0);

var pkg = result.pkg;
var args = result.args;

var diff = require('object-diff');
var res = diff(old.scripts, pkg.scripts);

var chalk = require('chalk');

console.log(chalk.green('scripts\n'));

Object.keys(res).forEach(function(key) {
  console.log(chalk.red('- \"' + key + '\"', old.scripts[key]));
  console.log(chalk.green('+ \"' + key + '\"', res[key]));
});
