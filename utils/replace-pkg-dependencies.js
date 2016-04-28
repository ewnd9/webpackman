'use strict';

var clone = require('clone');
var sortedObject = require('sorted-object');
var originalPkg = require(__dirname + '/../package.json');

module.exports = function(_pkg) {
  var pkg = clone(_pkg);

  pkg.devDependencies = pkg.devDependencies || {};

  Object.keys(originalPkg.dependencies).forEach(function(key) {
    if (/(?:plugin|loader|webpack|autoprefixer|postcss)/.test(key)) { // @TODO remove autoprefixer
      pkg.devDependencies[key] = originalPkg.dependencies[key];
    }
  });

  delete pkg.devDependencies['webpackman'];
  pkg.devDependencies = sortedObject(pkg.devDependencies);

  return pkg;
};
