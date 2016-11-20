# webpackman

Shared webpack config files.

## Install

```sh
$ npm install webpackman babel-preset-es2015 babel-preset-stage-0 -D
```

```js
// webpack.config.js
module.exports = require('webpackman/webpack.config');
```

```js
// webpack.config.prod.js
module.exports = require('webpackman/webpack.config.prod');
```

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server",
    "build": "rm -rf dist && webpack --config webpack.config.prod.js"
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
$ npm run build # build to the dist folder
```

## Loaders

### `.js`

[`babel-loader`](https://github.com/babel/babel-loader)

### `.css`

css files which have `components` directory in their path will be loaded as [`css-modules`](https://github.com/css-modules/css-modules)

- `**/style.css` - generic css
- `**/components/**/*.css` - `css-modules`

### `.html`, `.png`, `.jpeg`, `.gif`, `.json`, `.woff2`, `.ttf`, `.eot`, `.svg`

static loaders

## Changelog

- [`v0.7.0`](https://github.com/ewnd9/webpackman/tree/v0.7.0) - hash -> chunkhash
- [`v0.6.0`](https://github.com/ewnd9/webpackman/tree/v0.6.0) - remove all overloading, leave only webpack config files
- [`v0.5.0`](https://github.com/ewnd9/webpackman/tree/v0.5.0) - add x-public-path
- [`v0.1.0`](https://github.com/ewnd9/webpackman/tree/v0.1.0) - initial version with my opinionated react config  

## Used in

- [ewnd9/media-center](https://github.com/ewnd9/media-center) ([migration commit](https://github.com/ewnd9/media-center/commit/960587f1488747876b9b9a4f560b74f250eaa6ea))
- [ewnd9/the-feed](https://github.com/ewnd9/the-feed) ([migration commit](https://github.com/ewnd9/the-feed/commit/b601e02e3d056e5f67ef4bb8ebb3700ac149c099))

## Tests

```js
$ npm test
$ NODE_ENV=test-update npm test # update screenshots
```

## Related

- [create-react-app](https://github.com/facebookincubator/create-react-app)

## License

MIT © [ewnd9](http://ewnd9.com)
