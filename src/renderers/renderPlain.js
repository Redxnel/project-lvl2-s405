import _ from 'lodash';

const setValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const propertyActions = {
  added: (obj, path) => `Property '${path}${obj.name}' was added with value: ${setValue(obj.value)}`,
  updated: (obj, path) => `Property '${path}${obj.name}' was updated. From ${setValue(obj.value.valueBefore)} to ${setValue(obj.value.valueAfter)}`,
  removed: (obj, path) => `Property '${path}${obj.name}' was removed`,
  nested: (obj, path, func) => func(obj.children, `${path}${obj.name}.`),
  unchanged: () => [],
};

const render = (ast, name = '') => {
  const result = ast.reduce(
    (acc, node) => [...acc, (propertyActions[node.type](node, name, render))], [],
  );
  return _.flatten(result).join('\n');
};

export default render;
