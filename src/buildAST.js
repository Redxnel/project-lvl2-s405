import _ from 'lodash';
import Node from './Node';

const buildDiffAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    switch (true) {
      case data1[key] instanceof Object && data2[key] instanceof Object:
        return new Node(key, '', 'nested', buildDiffAST(data1[key], data2[key]));
      case data1[key] === data2[key]:
        return new Node(key, data1[key], 'unchanged');
      case !_.has(data2, key):
        return new Node(key, data1[key], 'removed');
      case !_.has(data1, key):
        return new Node(key, data2[key], 'added');
      default:
        return new Node(key, { valueBefore: data1[key], valueAfter: data2[key] }, 'updated');
    }
  });
};

export default buildDiffAST;
