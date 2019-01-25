import _ from 'lodash';
import { selectValue } from '../utils';

const propertyActions = [
  {
    name: 'added',
    action: (obj, path) => `Property '${path}${obj.name}' was added with value: ${selectValue(obj.value)}`,
  },
  {
    name: 'updated',
    action: (obj, path) => `Property '${path}${obj.name}' was updated. From ${selectValue(obj.value.valueBefore)} to ${selectValue(obj.value.valueAfter)}`,
  },
  {
    name: 'removed',
    action: (obj, path) => `Property '${path}${obj.name}' was removed`,
  },
  {
    name: 'nested',
    action: (obj, path, func) => func(obj.children, `${path}${obj.name}.`),
  },
  {
    name: 'unchanged',
    action: () => [],
  },
];

const getAction = type => propertyActions.find(({ name }) => name === type);

const render = (ast, name = '') => {
  const result = ast.reduce((acc, node) => {
    const { action } = getAction(node.type);
    return [...acc, action(node, name, render)];
  }, []);

  return _.flatten(result).join('\n');
};

export default render;
