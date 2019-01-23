import fs from 'fs';
import genDiff from '../src';

const expectedSimple = fs.readFileSync('__tests__/__fixtures__/results/result.txt', 'utf-8');

const expectedAST = fs.readFileSync('__tests__/__fixtures__/results/resultAST.txt', 'utf-8');

test.each`
  path1 | path2 | expected 
  ${'__tests__/__fixtures__/json/before.json'} | ${'__tests__/__fixtures__/json/after.json'} | ${expectedSimple}
  ${'__tests__/__fixtures__/yml/before.yml'} | ${'__tests__/__fixtures__/yml/after.yml'} | ${expectedSimple}
  ${'__tests__/__fixtures__/ini/before.ini'} | ${'__tests__/__fixtures__/ini/after.ini'} | ${expectedSimple}
  ${'__tests__/__fixtures__/json/beforeAST.json'} | ${'__tests__/__fixtures__/json/afterAST.json'} | ${expectedAST}
  ${'__tests__/__fixtures__/yml/beforeAST.yml'} | ${'__tests__/__fixtures__/yml/afterAST.yml'} | ${expectedAST}
  ${'__tests__/__fixtures__/ini/beforeAST.ini'} | ${'__tests__/__fixtures__/ini/afterAST.ini'} | ${expectedAST}
  `('diff',
  ({ path1, path2, expected }) => {
    expect(genDiff(path1, path2)).toBe(expected);
  });
