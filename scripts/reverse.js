'use strict';

const path = require('path');
const clone = require('clone');
const diff = require('object-diff');
const fs = require('fs');
const chalk = require('chalk');

const replaceScripts = require('./utils/replace-pkg-scripts');
const replaceDependencies = require('./utils/replace-pkg-dependencies');

const codemod = require('./utils/codemod-file');

const pkgPath = process.cwd() + '/package.json';

const pkg0 = require(pkgPath);
const old = clone(pkg0);

const result = replaceScripts(pkg0);

const pify = require('pify');
const ncp = pify(require('ncp'));

const _pkg = result.pkg;
const pkg = replaceDependencies(_pkg);

printDiff(pkg, old, 'scripts');
printDiff(pkg, old, 'devDependencies');

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

Promise
  .all(
    ['webpack.config.js', 'webpack.config.prod.js']
      .map(file => {
        const src = path.resolve(__dirname, '..', file);
        const dst = path.resolve(process.cwd(), file);

        return ncp(src, dst)
          .then(() => {
            if (file === 'webpack.config.js') {
              return codemod(dst, result.wserve && result.wserve['x-replace'] || []);
            } else if (file === 'webpack.config.prod.js') {
              return codemod(dst, result.build && result.wbuild['x-replace'] || []);
            }
          });
      })
  );

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
