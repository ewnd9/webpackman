import test from 'ava';
import replacePkgScripts from '../utils/replace-pkg-scripts';

test('replace pkg scripts', async t => {
  const pkg0 = {
    scripts: {
      build: 'echo begin && wbuild && echo end'
    }
  };

  const { args, pkg } = replacePkgScripts(pkg0);
  t.truthy(pkg.scripts.build === 'echo begin && webpack -c webpack.config.js && echo end');
  t.truthy(Object.keys(args.wbuild).length === 0);
});
