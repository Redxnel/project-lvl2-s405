import { selectValue } from '../utils';

const render = (ast, name = '') => {
  const result = ast.reduce((acc, node) => {
    const path = name.length === 0 ? node.name : `${name}.${node.name}`;
    if (node.type === 'added') {
      return [...acc, `Property '${path}' was added with value: ${selectValue(node.value)}`];
    }
    if (node.type === 'updated') {
      return [...acc, `Property '${path}' was updated. From ${selectValue(node.value.valueBefore)} to ${selectValue(node.value.valueAfter)}`];
    }
    if (node.type === 'removed') {
      return [...acc, `Property '${path}' was removed`];
    }
    if (node.type === 'nested') {
      return [...acc, render(node.children, path)];
    }
    return acc;
  }, []);

  return result.join('\n');
};

export default render;
