import fs from 'fs';
import genDiff from '../src';

const expectedSimple = fs.readFileSync('__tests__/__fixtures__/results/result.txt', 'utf-8');

test.each([
  ['__tests__/__fixtures__/json/before.json', '__tests__/__fixtures__/json/after.json'],
  ['__tests__/__fixtures__/yml/before.yml', '__tests__/__fixtures__/yml/after.yml'],
  ['__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini'],
])(
  'diffSimple',
  (path1, path2) => {
    expect(genDiff(path1, path2)).toBe(expectedSimple);
  },
);

const expectedAST = fs.readFileSync('__tests__/__fixtures__/results/resultAST.txt', 'utf-8');

test.each([
  ['__tests__/__fixtures__/json/beforeAST.json', '__tests__/__fixtures__/json/afterAST.json'],
  ['__tests__/__fixtures__/yml/beforeAST.yml', '__tests__/__fixtures__/yml/afterAST.yml'],
  ['__tests__/__fixtures__/ini/beforeAST.ini', '__tests__/__fixtures__/ini/afterAST.ini'],
])(
  'diffAST',
  (path1, path2) => {
    expect(genDiff(path1, path2)).toBe(expectedAST);
  },
);
