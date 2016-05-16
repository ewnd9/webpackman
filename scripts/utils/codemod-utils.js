'use strict';

function overridePlugin(ast, j, plugin, property, value) {
  ast
    .find(j.Property, function(node) {
      return node.key && node.key.name === property;
    })
    .filter(p => {
      return p.parent.parent.value.callee.name === plugin &&
             p.parent.parent.parent.parent.value.key.name === 'plugins';
    })
    .forEach(p => {
      p.get('value').replace(j.literal(value));
    })
}

function overrideProperty(ast, j, path, value) {
  ast
    .find(j.Property, function(node) {
      return node.key && node.key.name === path[path.length - 1];
    })
    .filter(p => {
      var curr = p;

      for (var i = path.length - 2 ; i >= 0 ; i--) {
        if (curr.parent &&
            curr.parent.parent &&
            curr.parent.parent.value.key &&
            curr.parent.parent.value.key.name === path[i]) {
          curr = curr.parent.parent;
        } else {
          return false;
        }
      }

      return true;
    })
    .forEach(p => {
      p.get('value').replace(j.literal(value));
    });
}

function removeOverriderCall(ast, j) {
  ast
    .find(j.CallExpression, {
      callee: function(node) {
        return node.callee && node.callee.name === 'require' &&
               node.arguments && node.arguments[0] &&
               node.arguments[0].rawValue === './scripts/utils/override-object-properties';
      }
    })
    .forEach(p => {
      j(p.get()).remove();
    });
}

exports.overridePlugin = overridePlugin;
exports.overrideProperty = overrideProperty;
exports.removeOverriderCall = removeOverriderCall;
