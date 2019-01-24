import { selectValue } from '../utils';

const render = (ast, name = '') => {
  const result = ast.reduce((acc, node) => {
    switch (node.type) {
      case 'added':
        return [...acc, `Property '${name}${node.name}' was added with value: ${selectValue(node.value)}`];
      case 'updated':
        return [...acc, `Property '${name}${node.name}' was updated. From ${selectValue(node.value.valueBefore)} to ${selectValue(node.value.valueAfter)}`];
      case 'removed':
        return [...acc, `Property '${name}${node.name}' was removed`];
      case 'nested':
        return [...acc, render(node.children, `${name}${node.name}.`)];
      default:
        return acc;
    }
  }, []);

  return result.join('\n');
};

export default render;
