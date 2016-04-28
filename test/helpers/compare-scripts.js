'use strict';

const path = require('path');
const pify = require('pify');

const fs = pify(require('fs'));
const hasha = require('hasha');

module.exports = function(sampleDir, testDir) {
  let testFiles;
  return fs.readdir(testDir)
    .then(files => {
      testFiles = files;
      return fs.readdir(sampleDir);
    })
    .then(files => {
      console.log(`files: ${files.join(', ')}`);
      console.log(`testFiles: ${testFiles.join(', ')}`);
      
      return Promise
        .all(files.map(file => compareFiles(`${sampleDir}/${file}`, `${testDir}/${file}`)))
        .then(result => {
          return { files, result, testFiles };
        });
    });
};

function compareFiles(file1, file2) {
  return hash(file1)
    .then(hash1 => {
      return hash(file2)
        .then(hash2 => hash1 === hash2);
    });
}

function hash(file) {
  return hasha.fromFile(file, { algorithm: 'md5' });
}
