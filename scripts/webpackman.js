#!/usr/bin/env node

const argv = process.argv.slice(2);

if (argv[0] === '--reverse') {
  require('./reverse');
} 
