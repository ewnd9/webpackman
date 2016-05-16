import test from 'ava';

import pify from 'pify';
import fs from 'fs';
const readFile = pify(fs.readFile);

import codemod from '../utils/codemod';

import jscodeshift from 'jscodeshift';

test('refactor code with jscodeshift', async t => {
  const file = await readFile('./fixtures/config.sample.js', 'utf-8');

  const queries = [
    'entry.app=./frontend/app.js',
    'plugins.HtmlWebpackPlugin.template=./frontend/index.html',
    'output.path=./public'
  ];

  const res = codemod({ source: file }, { jscodeshift }, {}, queries);

  t.regex(res, /frontend\/app\.js/g);
  t.regex(res, /frontend\/index\.html/g);
  t.falsy(/override-config-properties/g.test(res));
});
