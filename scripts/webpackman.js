#!/usr/bin/env node

'use strict';

const argv = process.argv.slice(2);

if (argv[0] === '--reverse') {
  require('./reverse');
}
