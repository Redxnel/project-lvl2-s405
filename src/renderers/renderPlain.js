import Added from '../tools/Added';
import Updated from '../tools/Updated';
import Removed from '../tools/Removed';
import Nested from '../tools/Nested';
import { selectValue } from '../utils';

const render = (ast, name = '') => {
  const result = ast.reduce((acc, node) => {
    if (node.type === 'added') {
      const added = new Added(node.name, node.value, selectValue);
      return [...acc, added.toPLain(name)];
    }
    if (node.type === 'updated') {
      const updated = new Updated(node.name, node.value, selectValue);
      return [...acc, updated.toPLain(name)];
    }
    if (node.type === 'removed') {
      const removed = new Removed(node.name, node.value);
      return [...acc, removed.toPLain(name)];
    }
    if (node.type === 'nested') {
      const nested = new Nested(node.name, node.children, render);
      return [...acc, nested.toGetDepth(name)];
    }
    return acc;
  }, []);

  return result.join('\n');
};

export default render;
