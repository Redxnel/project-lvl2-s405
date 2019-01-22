import _ from 'lodash';
import parse from './parsers';

const genDiff = (path1, path2) => {
  const data1 = parse(path1);
  const data2 = parse(path2);

  const keys = _.union(Object.keys(data1), Object.keys(data2));

  const diff = keys.reduce((acc, key) => {
    if (data1[key] === data2[key]) {
      return [...acc, `\n    ${key}: ${data1[key]}`];
    }
    if (!_.has(data2, key)) {
      return [...acc, `\n  - ${key}: ${data1[key]}`];
    }
    if (!_.has(data1, key)) {
      return [...acc, `\n  + ${key}: ${data2[key]}`];
    }
    return [...acc, `\n  + ${key}: ${data2[key]}\n  - ${key}: ${data1[key]}`];
  }, []);

  return `{${diff.join('')}\n}`;
};

export default genDiff;
