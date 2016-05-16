import test from 'ava';
import overrideConfigProperties from '../utils/override-config-properties';

test('override config properties', t => {
  const obj0 = {
    test1: {
      test2: 'original'
    }
  };

  t.truthy(obj0.test1.test2 === 'original');
  overrideConfigProperties(obj0, ['test1.test2=replacement']);
  t.truthy(obj0.test1.test2 === 'replacement');
});
