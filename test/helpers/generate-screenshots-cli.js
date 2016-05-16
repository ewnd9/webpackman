'use strict';

const path = require('path');
const pify = require('pify');
const rimraf = pify(require('rimraf'));

const genScreens = require('./generate-screenshots').genScreens;
const npmBuild = require('./generate-screenshots').npmBuild;

if (!process.argv[2]) {
  throw new Error(`Usage: $ generate-screenshots-cli react`)
}

const project = process.argv[2];
const projectDir = path.resolve(__dirname, '..', '..', 'examples', project);

return rimraf(`${projectDir}/screenshots`)
  .then(() => npmBuild(projectDir))
  .then(() => genScreens(projectDir))
  .then(() => console.log('end'))
  .catch(err => console.error(err.stack || err));
