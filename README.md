# webpackman

Reduce webpack workflow to 2 scripts: `wbuild` and `wserve`.

The idea is to have shared webpack configuration files, little shortcuts and
a script to reverse them in case of big changes.

## Install

```sh
$ npm install webpackman -D
$ npm install babel-preset-es2015 babel-preset-stage-0 -D
```

```json
// package.json
{
  "scripts": {
    "start": "wserve",
    "build": "rm -rf dist && wbuild"
  }
}
```

```json
// .babelrc
{
  "presets": ["es2015", "stage-0"]
}
```

## Usage

```sh
$ npm start # start dev-server at localhost:8080
$ npm run build # build to the dist folder (overridable)
```

## Loaders

### js

`babel-loader`

### css

css files which have `components` directory in their path will be loaded as `css-modules`

- `**/style.css` - generic css
- `**/components/**/*.css` - `css-modules`

## Override default config

### Command line arguments

```sh
$ wbuild --x-override "entry.app=lib/entry.js"
$ wbuild --x-override "entry.vendors=[react,react-dom,redux]"

$ wbuild --x-override "plugins.HtmlWebpackPlugin.template=lib/index.html"
$ wbuild --x-override "plugins.HtmlWebpackPlugin.favicon=lib/favicon.ico"
$ wbuild --x-override "output.path=output"
```

The `--x-` prefix is for the preventing collisions with `webpack`'s arguments

### Programmatically

You need to add `--config` argument to `wserve` and `wbuild`.

```
$ wbuild --config config.prod.js
$ wserve --config config.dev.js
```

```js
// config.dev.js
const config = require('webpackman/webpack.config.js')
// modify config
module.exports = config;
```

```js
// config.prod.js
const config = require('webpackman/webpack.config.prod.js')
// modify config
module.exports = config;
```

## Reverse

```sh
$ node_modules/.bin/webpackman --reverse
```

1. Copy `webpack.config.js` and `webpack.config.prod.js` to a cwd
2. Delete `webpackman` from `devDependencies`
3. Add all plugins and loaders dependencies of `webpackman` to `devDependencies`
4. Replace `wserve` to `webpack-dev-server` and `wbuild` to `webpack` in `package.json`'s scripts

## Changelog

- [`v0.6.0`](https://github.com/ewnd9/webpackman/tree/v0.6.0) - replace overriding logic, add the reverse command
- [`v0.5.0`](https://github.com/ewnd9/webpackman/tree/v0.5.0) - add x-public-path
- [`v0.1.0`](https://github.com/ewnd9/webpackman/tree/v0.1.0) - initial version with my opinionated react config  

## Used in

- [ewnd9/media-center](https://github.com/ewnd9/media-center) ([migration commit](https://github.com/ewnd9/media-center/commit/960587f1488747876b9b9a4f560b74f250eaa6ea))
- [ewnd9/the-feed](https://github.com/ewnd9/the-feed) ([migration commit](https://github.com/ewnd9/the-feed/commit/b601e02e3d056e5f67ef4bb8ebb3700ac149c099))

## License

MIT © [ewnd9](http://ewnd9.com)
