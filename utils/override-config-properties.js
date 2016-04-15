'use strict';

var clone = require('clone');

module.exports = function(config, replacementArray) {
  var result = clone(config);

  replacementArray.forEach(function(str) {
    if (!str || typeof str === 'boolean') {
      return;
    }

    replaceProperty(result, str);
  });

  return result;
};

function replaceProperty(obj, str) {
  var d0 = str.split('=');

  var path = d0[0];
  var value = d0[1];

  var curr = obj;

  var d1 = path.split('.');
  var last = d1[d1.length - 1];

  d1.slice(0, d1.length - 1).forEach(function(part) {
    if (curr[part]) {
      curr = curr[part];
    } else {
      throw new Error('"' + str + '" not found in config');
    }
  });

  if (curr[last]) {
    curr[last] = value;
  } else {
    throw new Error('"' + str + '" not found in config');
  }
};
