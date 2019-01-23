import _ from 'lodash';

const buildDiffAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      return { name: key, children: buildDiffAST(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { name: key, type: 'unchanged', valueBefore: data1[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, type: 'deleted', valueBefore: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', valueAfter: data2[key] };
    }
    return {
      name: key, type: 'changed', valueBefore: data1[key], valueAfter: data2[key],
    };
  });
};

export default buildDiffAST;
