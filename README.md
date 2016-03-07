# webpackman

[WIP] Reduce webpack workflow to 2 scripts: "wbuild" and "wserve"

## Install

```
$ npm install webpackman -D
$ npm install babel-preset-es2015 babel-preset-stage-0 -D
```

```json
// .babelrc
{
  "presets": ["es2015", "stage-0"]
}
```

```json
// package.json
{
  "scripts": {
    "start": "wserve",
    "build": "NODE_ENV=production rm -rf dist && wbuild"
  }
}
```

## Usage

```
$ npm start # open localhost:8080
$ npm run build # content will be in the dist folder
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

## Used in

- [ewnd9/media-center](https://github.com/ewnd9/media-center) ([migration commit](https://github.com/ewnd9/media-center/commit/960587f1488747876b9b9a4f560b74f250eaa6ea))
- [ewnd9/the-feed](https://github.com/ewnd9/the-feed) ([migration commit](https://github.com/ewnd9/the-feed/commit/b601e02e3d056e5f67ef4bb8ebb3700ac149c099))

## License

MIT © [ewnd9](http://ewnd9.com)
