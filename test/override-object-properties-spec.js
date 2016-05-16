import test from 'ava';
import overrideConfigProperties from '../scripts/utils/override-object-properties';

test('override string', t => {
  const obj0 = {
    test1: {
      test2: 'original'
    }
  };

  t.truthy(obj0.test1.test2 === 'original');
  overrideConfigProperties(obj0, ['test1.test2=replacement']);
  t.truthy(obj0.test1.test2 === 'replacement');
});

test('override array', t => {
  const obj0 = {
    test1: {
      test2: []
    }
  };

  t.truthy(Array.isArray(obj0.test1.test2));
  t.truthy(obj0.test1.test2.length === 0);

  overrideConfigProperties(obj0, ["test1.test2=[a,b]"]);

  t.truthy(Array.isArray(obj0.test1.test2));
  t.truthy(obj0.test1.test2.length === 2);
  t.deepEqual(obj0.test1.test2, ['a', 'b']);
});
