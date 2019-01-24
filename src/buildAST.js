import _ from 'lodash';
import Node from './tools/Node';

const buildDiffAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      return new Node(key, '', 'nested', buildDiffAST(data1[key], data2[key]));
    }
    if (data1[key] === data2[key]) {
      return new Node(key, data1[key], 'unchanged');
    }
    if (!_.has(data2, key)) {
      return new Node(key, data1[key], 'removed');
    }
    if (!_.has(data1, key)) {
      return new Node(key, data2[key], 'added');
    }

    return new Node(key, { valueBefore: data1[key], valueAfter: data2[key] }, 'updated');
  });
};

export default buildDiffAST;
