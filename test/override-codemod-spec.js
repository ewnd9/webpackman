import test from 'ava';

import { transform } from '../scripts/utils/codemod-file';

test('refactor code with jscodeshift', async t => {
  const filePath = './fixtures/config.sample.js'

  const queries = [
    'entry.app=./frontend/app.js',
    'plugins.HtmlWebpackPlugin.template=./frontend/index.html',
    'output.path=./public'
  ];

  const res = await transform(filePath, queries);

  t.regex(res, /frontend\/app\.js/g);
  t.regex(res, /frontend\/index\.html/g);
  t.falsy(/override-config-properties/g.test(res));
});
