import test from 'ava';
import path from 'path';
import pify from 'pify';
import execa from 'execa';

import _imageDiff from 'image-diff';
const imageDiff = pify(_imageDiff);

import { genScreens, npmInstall, npmBuild, cpAndClean } from './helpers/generate-screenshots';
import cmpScreens from './helpers/compare-screenshots';
import cmpScripts from './helpers/compare-scripts';

test('asd', async t => {
  await testExampleProject(t, 'append-child');
});

async function testExampleProject(t, testProject) {
  const sample = path.resolve(__dirname, '..', 'examples', testProject);
  const date = Date.now();

  const sampleCopy = `/tmp/clone-${date}`;
  const dest = `/tmp/${date}`;
  const destReverse = `/tmp/reverse-${date}`;

  await cpAndClean(sample, sampleCopy); // first copy of the project without screenshots

  await npmInstall(sampleCopy); // build dist files
  await npmBuild(sampleCopy); // build dist files

  // ==

  await cpAndClean(sample, dest); // second copy of the project without screenshots

  await npmInstall(dest);
  await npmBuild(dest);

  await compareScreens(t, sample, dest); // comparing the original files (reference screenshots stored in git) with the second copy screenshots

  // await compareScripts(t, `${sampleCopy}/dist`, `${dest}/dist`); // comparing the first copy dist files with the second copy dist files
  // can't compare scripts right now because hash is generated based on content+path

  // ==

  await cpAndClean(sample, destReverse); // third copy of the project
  await reverse(destReverse); // reverse webpackman dependencies to project

  await npmInstall(destReverse);
  await npmBuild(destReverse);

  await compareScreens(t, sample, destReverse); //

  // await compareScripts(t, `${sampleCopy}/dist`, `${destReverse}/dist`);
  // can't compare scripts right now because hash is generated based on content+path
}

function compareScreens(t, sample, dest) {
  return genScreens(dest)
    .then(() => cmpScreens(`${sample}/screenshots`, `${dest}/screenshots`))
    .then(({ files, result }) => compareDirectory('screens', t, sample, dest, files, result));
}

function compareScripts(t, sample, dest) {
  return cmpScripts(sample, dest)
    .then(({ files, result, testFiles }) => {
      return compareDirectory('scripts', t, sample, dest, files, result);
    });
}

function compareDirectory(name, t, sample, dest, files, result) {
  const errors = [];
  t.truthy(files.length > 0);

  files.forEach((file, i) => {
    const res = result[i];
    console.log(`${name} :: ${sample}/${file}: ${res}`);

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
