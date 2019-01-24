import _ from 'lodash';
import Unchanged from '../tools/Unchanged';
import Added from '../tools/Added';
import Updated from '../tools/Updated';
import Removed from '../tools/Removed';
import Nested from '../tools/Nested';
import { stringify } from '../utils';

const render = (ast, level = 0) => {
  const space = '    '.repeat(level);
  const result = ast.map((node) => {
    if (node.type === 'added') {
      const added = new Added(node.name, node.value, stringify, space, level);
      return [added.toString()];
    }
    if (node.type === 'updated') {
      const updated = new Updated(node.name, node.value, stringify, space, level);
      return [updated.toString()];
    }
    if (node.type === 'removed') {
      const removed = new Removed(node.name, node.value, stringify, space, level);
      return [removed.toString()];
    }
    if (node.type === 'unchanged') {
      const unchanged = new Unchanged(node.name, node.value, stringify, space, level);
      return [unchanged.toString()];
    }
    const nested = new Nested(node.name, node.children, render, space, level);
    return [nested.toString()];
  });

  return `{${_.flatten(result).join('')}\n${space}}`;
};

export default render;
