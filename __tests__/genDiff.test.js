import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

test.each([
  ['__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json'],
  ['__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml'],
  ['__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini'],
])(
  'diff',
  (path1, path2) => {
    expect(genDiff(path1, path2)).toBe(expected);
  },
);
