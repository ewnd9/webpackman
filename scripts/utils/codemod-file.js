'use strict';

const pify = require('pify');
const fs = require('fs');

const readFile = pify(fs.readFile);
const writeFile = pify(fs.writeFile);

const codemod = require('./codemod');
const jscodeshift = require('jscodeshift');

module.exports = function(filePath, queries) {
  return transform(filePath, queries)
    .then(res => writeFile(filePath, res));
};

const transform = module.exports.transform = function transform(filePath, queries) {
  return readFile(filePath, 'utf-8')
    .then(file => {
      const res = codemod({ source: file }, { jscodeshift }, {}, queries);
      return res;
    });
}
