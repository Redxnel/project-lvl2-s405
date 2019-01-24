import fs from 'fs';
import genDiff from '../src';

test.each`
  path1 | path2 | expectedSimple | expectedPlain
  ${'__tests__/__fixtures__/json/before.json'} | ${'__tests__/__fixtures__/json/after.json'} | ${fs.readFileSync('__tests__/__fixtures__/results/result.txt', 'utf-8')} | ${fs.readFileSync('__tests__/__fixtures__/results/result.plain', 'utf-8')}
  ${'__tests__/__fixtures__/yml/before.yml'} | ${'__tests__/__fixtures__/yml/after.yml'} | ${fs.readFileSync('__tests__/__fixtures__/results/result.txt', 'utf-8')} | ${fs.readFileSync('__tests__/__fixtures__/results/result.plain', 'utf-8')}
  ${'__tests__/__fixtures__/ini/before.ini'} | ${'__tests__/__fixtures__/ini/after.ini'} | ${fs.readFileSync('__tests__/__fixtures__/results/result.txt', 'utf-8')} | ${fs.readFileSync('__tests__/__fixtures__/results/resultINI.plain', 'utf-8')}
  ${'__tests__/__fixtures__/json/beforeAST.json'} | ${'__tests__/__fixtures__/json/afterAST.json'} | ${fs.readFileSync('__tests__/__fixtures__/results/resultAST.txt', 'utf-8')} | ${fs.readFileSync('__tests__/__fixtures__/results/resultAST.plain', 'utf-8')}
  ${'__tests__/__fixtures__/yml/beforeAST.yml'} | ${'__tests__/__fixtures__/yml/afterAST.yml'} | ${fs.readFileSync('__tests__/__fixtures__/results/resultAST.txt', 'utf-8')} | ${fs.readFileSync('__tests__/__fixtures__/results/resultAST.plain', 'utf-8')}
  ${'__tests__/__fixtures__/ini/beforeAST.ini'} | ${'__tests__/__fixtures__/ini/afterAST.ini'} | ${fs.readFileSync('__tests__/__fixtures__/results/resultAST.txt', 'utf-8')} | ${fs.readFileSync('__tests__/__fixtures__/results/resultAST.plain', 'utf-8')}
  `('diff',
  ({
    path1, path2, expectedSimple, expectedPlain,
  }) => {
    expect(genDiff(path1, path2)).toBe(expectedSimple);
    expect(genDiff(path1, path2, 'plain')).toBe(expectedPlain);
  });
