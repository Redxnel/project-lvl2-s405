import genDiff from '../src/genDiff';

test('gendiff', () => {
  const diff = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');

  const expected = {
    '  host': 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '- follow': false,
    '+ verbose': true,
  };

  expect(diff).toEqual(expected);
});
