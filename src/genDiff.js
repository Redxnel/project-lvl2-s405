import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const genDiff = (path1, path2) => {
  const pathFormat1 = path.extname(path1);
  const pathFormat2 = path.extname(path2);
  const data1 = parse(pathFormat1, fs.readFileSync(path1, 'utf-8'));
  const data2 = parse(pathFormat2, fs.readFileSync(path2, 'utf-8'));

  const keys = _.union(Object.keys(data1), Object.keys(data2));

  const diff = keys.reduce((acc, key) => {
    if (data1[key] === data2[key]) {
      return [...acc, `    ${key}: ${data1[key]}`];
    }
    if (!_.has(data2, key)) {
      return [...acc, `  - ${key}: ${data1[key]}`];
    }
    if (!_.has(data1, key)) {
      return [...acc, `  + ${key}: ${data2[key]}`];
    }
    return [...acc, `  + ${key}: ${data2[key]}\n  - ${key}: ${data1[key]}`];
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
