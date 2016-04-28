'use strict';

const path = require('path');
const pify = require('pify');

const fs = pify(require('fs'));
const imageDiff = pify(require('image-diff'));

module.exports = function(sampleDir, testDir) {
  return fs.readdir(sampleDir)
    .then(files => {
      return Promise
        .all(files.map(file => imageDiff({
          expectedImage: `${sampleDir}/${file}`,
          actualImage: `${testDir}/${file}`,
          diffImage: `${testDir}/diff-${file}`
        })))
        .then(result => {
          return { files, result };
        });
    });
};
