'use strict';

const pify = require('pify');

const fs = pify(require('fs'));
const imageDiff = pify(require('image-diff'));

module.exports = function(sampleDir, testDir) {
  return fs.readdir(sampleDir)
    .then(files => {
      const promises = files.map(file => {
        const expected = `${sampleDir}/${file}`;
        const actual = `${testDir}/${file}`;
        const diff = `${testDir}/diff-${file}`;

        const params = {
          expectedImage: expected,
          actualImage: actual,
          diffImage: diff
        };

        return imageDiff(params)
          .then(result => ({
            expected,
            actual,
            diff,
            result
          }));
      });

      return Promise.all(promises);
    });
};
