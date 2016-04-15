'use strict';

var shellUtils = require('shell-quote');
var minimist = require('minimist');
var clone = require('clone');

module.exports = function(_pkg) {
  var pkg = clone(_pkg);
  var args = {};

  Object.keys(pkg.scripts).forEach(function(key) {
    var script = pkg.scripts[key];
    var result = replaceScript(script, 'wbuild', ['webpack', '-c', 'webpack.config.js']);

    if (result) {
      pkg.scripts[key] = result.script;
      args[result.args._] = result.args;
      delete result.args._;
    }
  });

  return {
    pkg: pkg,
    args: args
  };
};

function replaceScript(script, target, replacement) {
  var xs = shellUtils.parse(script);

  var buildInd = extract(xs, 'wbuild');

  if (buildInd) {
    var args = minimist(xs.slice(buildInd[0], buildInd[1]));

    var before = xs.slice(0, buildInd[0]);
    var after = xs.slice(buildInd[1]);

    return {
      script: shellUtils.unparse(before.concat(replacement).concat(after)),
      args: args
    };
  } else {
    return null;
  }
};

function extract(xs, token) {
  var index = xs.indexOf(token);

  if (index === -1) {
    return null;
  }

  for (var i = index ; i < xs.length ; i++) {
    if (typeof xs[i] === 'object' && xs[i].op !== 'glob') {
      break;
    }
  }

  return [index, i];
}
