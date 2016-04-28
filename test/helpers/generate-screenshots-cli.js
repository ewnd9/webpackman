'use strict';

const pify = require('pify');
const rimraf = pify(require('rimraf'));
const job = require('./generate-screenshots');

return rimraf('./../../examples/react/screenshots')
  .then(() => job('examples/react'))
  .then(() => console.log('done'))
  .catch(err => console.error(err.stack || err));
