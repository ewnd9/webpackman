'use strict';

module.exports = overrider;

function overrider(queries, overridePlugin, overrideProperty) {
  queries.forEach(query => {
    const d0 = query.split('=');
    const path = d0[0].split('.');
    const value = d0[1];

    if (path[0] === 'plugins') {
      if (path.length === 3) {
        overridePlugin(path[1], path[2], value, query);
      } else {
        throw new Error(`wrong path: ${query}, should be like "plugins.HtmlWebpackPlugin.template"`);
      }
    } else {
      overrideProperty(path, value, query);
    }
  });
}
