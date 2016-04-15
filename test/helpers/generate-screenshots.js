'use strict';

const path = require('path');
const http = require('http');
const ecstatic = require('ecstatic');
const pify = require('pify');
const mkdirp = pify(require('mkdirp'));
const execa = require('execa');

const Pageres = require('pageres');

const ncp = pify(require('ncp'));
const rimraf = pify(require('rimraf'));

const fs = require('fs');
const readFile = pify(fs.readFile);
const writeFile = pify(fs.writeFile);

function genScreens(root, dest, port = 8080, useServer = true) {
  const address = `http://localhost:${port}/`;
  let server;

  return mkdirp(dest)
    .then(() => {
      console.log(`${root} pageres`);

      if (useServer) {
        server = http.createServer(ecstatic({ root })).listen(port);
      }

      console.log(address);

      return new Pageres({ delay: 2 })
        .src(address, ['1024x768'])
        .dest(dest)
        .on('warn', str => console.log(str))
        .on('err', str => console.log(str))
        .run()
        .then(() => {
          if (useServer) {
            server.close();
          }
        });
    });
}

function npmInstall(dir) {
  console.log(`${dir} npm install`);

  return (
    process.env.TRAVIS === true ?
      execa('npm', ['install'], { cwd: dir }) :
      execa('npm', ['--cache-min', '9999999', 'install'], { cwd: dir })
  );
}

function npmBuild(dir) {
  console.log(`${dir} npm run build`);
  return execa('npm', ['run', 'build'], { cwd: dir });
}

function cpAndClean(sample, dest) {
  return ncp(sample, dest)
    .then(() => {
      console.log(`${dest} rm node_modules|dist|screenshots`);

      return Promise.all([
        rimraf(`${dest}/node_modules`),  // ¯\_(ツ)_/¯ glob not working
        rimraf(`${dest}/dist`),
        rimraf(`${dest}/screenshots`),
        readFile(`${dest}/package.json`)
          .then(data => {
            const pkg = JSON.parse(data);
            pkg.devDependencies.webpackman = `file://${path.resolve(__dirname, '..', '..')}`;

            return writeFile(`${dest}/package.json`, JSON.stringify(pkg, null, 2));
          })
      ]);
    });
}

exports.genScreens = genScreens;

exports.npmInstall = npmInstall;
exports.npmBuild = npmBuild;

exports.cpAndClean = cpAndClean;
