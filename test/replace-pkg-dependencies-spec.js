import test from 'ava';
import replacePkgDependencies from '../scripts/utils/replace-pkg-dependencies';

test('replace pkg dependencies', t => {
  const pkg0 = {
    dependencies: {
    },
    devDependencies: {
    }
  };

  const pkg = replacePkgDependencies(pkg0);

  t.deepEqual(Object.keys(pkg.dependencies), []);
  t.deepEqual(Object.keys(pkg.devDependencies), [
    'autoprefixer',
    'babel-loader',
    'css-loader',
    'extract-text-webpack-plugin',
    'file-loader',
    'html-webpack-plugin',
    'image-loader',
    'imports-loader',
    'postcss-cssnext',
    'postcss-import',
    'postcss-loader',
    'raw-loader',
    'script-loader',
    'style-loader',
    'url-loader',
    'webpack',
    'webpack-dev-server'
  ]);
});
