import test from 'ava';

import fs from 'fs';
import path from 'path';
import pify from 'pify';

import { genScreens, npmInstall, npmBuild } from './helpers/generate-screenshots';
import cmpScreens from './helpers/compare-screenshots';

test.serial('append-child example project', async t => {
  await testExampleProject(t, 'append-child');
});

test.serial('react example project', async t => {
  await testExampleProject(t, 'react');
});

async function testExampleProject(t, testProject) {
  const sample = path.resolve(__dirname, '..', 'examples', testProject);
  const date = Date.now();

  await npmInstall(sample);
  await npmBuild(sample);

  const dest = `/tmp/screens-${date}`;
  const screens = `${sample}/screenshots`;
  const distBuild = `${sample}/dist`;

  await genScreens(distBuild, dest);
  const result = await cmpScreens(screens, `${dest}`);

  for (const r of result) {
    if (process.env.NODE_ENV === 'test-update') {
      await pify(fs.rename)(r.actual, r.expected);
    } else {
      if (!r.result) {
        const imgur = require('imgur');
        imgur.setClientId('a9e8e4383e6dfa2'); // record-desktop

        console.log((await imgur.uploadFile(r.diff)).data.link);
        console.log((await imgur.uploadFile(r.actual)).data.link);
      }

      t.truthy(r.result, `${r.actual} didn't match with ${r.expected}`);
    }
  }
}
