'use strict';

const path = require('path');
const http = require('http');
const ecstatic = require('ecstatic');
const pify = require('pify');
const mkdirp = pify(require('mkdirp'));
const execa = require('execa');

const Pageres = require('pageres');

module.exports = function(dir) {
  const dest = `${dir}/screenshots`;
  const port = 8080;
  const address = `http://localhost:${port}/`;
  const root = `${dir}/dist`;

  return mkdirp(dest)
    .then(() => {
      console.log(`${dir} npm install`);
      return execa('npm', ['install'], { cwd: dir });
    })
    .then(() => {
      console.log(`${dir} npm install ${path.resolve(__dirname, '..')} -D`);
      return execa('npm', ['install', path.resolve(__dirname, '..'), '-D'], { cwd: dir });
    })
    .then(() => {
      console.log(`${dir} npm run build`);
      return execa('npm', ['run', 'build'], { cwd: dir });
    })
    .then(() => {
      console.log(`${dir} pageres`);
      const server = http.createServer(
        ecstatic({ root })
      ).listen(port);

      return new Pageres({ delay: 2 })
        .src(address, ['1024x768'])
        .dest(dest)
        .run()
        .then(() => {
          server.close();
        });
    });
};
