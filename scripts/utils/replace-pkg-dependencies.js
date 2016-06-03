'use strict';

const clone = require('clone');
const sortedObject = require('sorted-object');

const path = require('path');
const originalPkg = require(path.resolve(__dirname, '..', '..', 'package.json'));

module.exports = function(_pkg) {
  const pkg = clone(_pkg);

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
