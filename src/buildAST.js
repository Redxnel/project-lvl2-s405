import _ from 'lodash';

const node = (name, valueBefore, valueAfter, type, children = []) => ({
  name, valueBefore, valueAfter, type, children,
});

const buildDiffAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    switch (true) {
      case data1[key] instanceof Object && data2[key] instanceof Object:
        return node(key, '', '', 'nested', buildDiffAST(data1[key], data2[key]));
      case !_.has(data2, key):
        return node(key, data1[key], '', 'removed');
      case !_.has(data1, key):
        return node(key, '', data2[key], 'added');
      case data1[key] === data2[key]:
        return node(key, data1[key], '', 'unchanged');
      case data1[key] !== data2[key]:
        return node(key, data1[key], data2[key], 'updated');
      default:
        return new Error('Unknown type');
    }
  });
};

export default buildDiffAST;
