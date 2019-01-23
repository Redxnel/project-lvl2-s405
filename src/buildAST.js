import _ from 'lodash';

const buildDiffAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  return _.flatten(keys.map((key) => {
    if (data1[key] instanceof Object && data2[key] instanceof Object) {
      return { name: key, children: buildDiffAST(data1[key], data2[key]), type: 'unchanged' };
    }
    if (data1[key] === data2[key]) {
      return { name: key, type: 'unchanged', value: data1[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, type: 'deleted', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    return [
      {
        name: key, type: 'added', value: data2[key],
      },
      {
        name: key, type: 'deleted', value: data1[key],
      },
    ];
  }));
};

export default buildDiffAST;
