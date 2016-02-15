# webpackman

Reduce webpack workflow to 2 scripts: "wbuild" and "wserve"

## Install

```
$ npm install webpackman -D
```

## Usage

```json
// package.json
{
  "scripts": {
    "start": "wserve",
    "build": "NODE_ENV=production rm -rf dist && wbuild"
  }
}
```

`webpackman` assumes you have a following structure

```
src
│ index.js
| *.css (will be loaded as global css)
└─components
  |    
  └─component-name
    |
    └─component-name.js
      *.css (will be loaded as css-module)
```

## Override default config

### Via arguments

```
$ wbuild --x-entry lib/entry.js
$ wbuild --x-html lib/index.html
$ wbuild --x-dist output
```

### Programmatically

You need to add `--config` argument to `wserve` and `wbuild`.

```
$ wbuild --config config.prod.js
$ wserve --config config.dev.js
```

:warning: `--config <file>` should be always first if presented

```js
// config.dev.js
const config = require('webpackman/webpack.config.dev.js')
// ...
// modify config
// ...
module.exports = config;
```

```js
// config.prod.js
const config = require('webpackman/webpack.config.prod.js')
// ...
// modify config
// ...
module.exports = config;
```



## Changelog

`v0.1.0` - initial version with my opinionated react config  

## License

MIT © [ewnd9](http://ewnd9.com)
