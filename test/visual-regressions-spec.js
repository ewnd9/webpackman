import test from 'ava';
import path from 'path';
import pify from 'pify';

import { ncp as _ncp } from 'ncp';
const ncp = pify(_ncp);

import _rimraf from 'rimraf';
const rimraf = pify(_rimraf);

import _imageDiff from 'image-diff';
const imageDiff = pify(_imageDiff);

import genScreens from '../utils/generate-screenshots';
import cmpScreens from '../utils/compare-screenshots';

test('asd', async t => {
  const sample = path.resolve(__dirname, '..', 'examples', 'react');

  const dest = `/tmp/${Date.now()}`;

  await ncp(sample, dest)
    .then(() => {
      console.log(`${dest} rm node_modules|dist`);
      return rimraf(`${dest}/(node_modules|dist)`)
    })
    .then(() => genScreens(dest))
    .then(() => cmpScreens(`${sample}/screenshots`, `${dest}/screenshots`))
    .then(({ files, result }) => {
      const errors = [];

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
    });
});
