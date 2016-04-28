import test from 'ava';
import path from 'path';
import pify from 'pify';
import execa from 'execa';

import { ncp as _ncp } from 'ncp';
const ncp = pify(_ncp);

import _rimraf from 'rimraf';
const rimraf = pify(_rimraf);

import _imageDiff from 'image-diff';
const imageDiff = pify(_imageDiff);

import genScreens, { npmInstallAndBuild } from './helpers/generate-screenshots';
import cmpScreens from './helpers/compare-screenshots';
import cmpScripts from './helpers/compare-scripts';

test('asd', async t => {
  const sample = path.resolve(__dirname, '..', 'examples', 'react');
  const date = Date.now();

  const sampleCopy = `/tmp/clone-${date}`;
  const dest = `/tmp/${date}`;
  const destReverse = `/tmp/reverse-${date}`;

  await cpAndClean(sample, sampleCopy);
  await npmInstallAndBuild(sampleCopy);

  await cpAndClean(sample, dest);
  await compareScreens(t, sample, dest);
  await compareScripts(t, `${sampleCopy}/dist`, `${dest}/dist`);

  await cpAndClean(sample, destReverse);
  await reverse(destReverse);
  await compareScreens(t, sample, destReverse);
  await compareScripts(t, `${sampleCopy}/dist`, `${destReverse}/dist`);
});

function cpAndClean(sample, dest) {
  return ncp(sample, dest)
    .then(() => {
      console.log(`${dest} rm node_modules|dist|screenshots`);

      return Promise.all([
        rimraf(`${dest}/node_modules`),
        rimraf(`${dest}/dist`),
        rimraf(`${dest}/screenshots`)
      ]); // ¯\_(ツ)_/¯
    });
}

function compareScreens(t, sample, dest) {
  return genScreens(dest)
    .then(() => cmpScreens(`${sample}/screenshots`, `${dest}/screenshots`))
    .then(({ files, result }) => compareDirectory(t, sample, dest, files, result));
}

function compareScripts(t, sample, dest) {
  return cmpScripts(sample, dest)
    .then(({ files, result, testFiles }) => {
      return compareDirectory(t, sample, dest, files, result);
    });
}

function compareDirectory(t, sample, dest, files, result) {
  const errors = [];
  t.truthy(files.length > 0);

  files.forEach((file, i) => {
    const res = result[i];
    console.log(`${sample}/${file}: ${res}`);

    if (!res) {
      errors.push(file);
    }
  });

  if (errors.length > 0) {
    t.fail(`${errors.join(', ')} don't match`);
  }
}

function reverse(dest) {
  return execa('node', [path.resolve(__dirname, '..', 'reverse')], { cwd: dest })
    .then(result => {
      console.log(result.stdout);
      console.log(result.stderr);
    });
};
