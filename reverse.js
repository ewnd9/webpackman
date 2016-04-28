'use strict';

const path = require('path');
const clone = require('clone');
const diff = require('object-diff');
const fs = require('fs');
const chalk = require('chalk');

const replaceScripts = require('./utils/replace-pkg-scripts');
const replaceDependencies = require('./utils/replace-pkg-dependencies');

const pkgPath = process.cwd() + '/package.json';

const pkg0 = require(pkgPath);
const old = clone(pkg0);

const result = replaceScripts(pkg0);

const _pkg = result.pkg;
const pkg = replaceDependencies(_pkg);

printDiff(pkg, old, 'scripts');
printDiff(pkg, old, 'devDependencies');

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

['webpack.config.js', 'webpack.config.prod.js'].forEach(file => {
  fs.createReadStream(path.resolve(__dirname, file)).pipe(fs.createWriteStream(path.resolve(process.cwd(), file)));
});

function printDiff(obj1, obj2, property) {
  console.log(`${chalk.green(property)}:`);

  const res = diff(obj1[property], obj2[property]);

  Object.keys(res).forEach(function(key) {
    if (obj2[property][key]) {
      console.log(chalk.red('- \"' + key + '\"', obj2[property][key]));
    }

    if (obj1[property][key]) {
      console.log(chalk.green('+ \"' + key + '\"', obj1[property][key]));
    }
  });
}
