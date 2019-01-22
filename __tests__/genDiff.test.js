import fs from 'fs';
import genDiff from '../src';

test('.jsonDiff', () => {
  const diff = genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');

  const expected = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(diff).toBe(expected);
});

test('.ymlDiff', () => {
  const diff = genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');

  const expected = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(diff).toBe(expected);
});
