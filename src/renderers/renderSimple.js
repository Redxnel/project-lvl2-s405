import _ from 'lodash';
import { stringify } from '../utils';

const levelUp = 1;

const toString = (space, operation, name, value, level, func) => {
  const argument = value instanceof Object ? func(value, level + levelUp) : value;
  return `\n  ${space}${operation}${name}: ${argument}`;
};

const operations = new Map([
  ['added', '+ '],
  ['removed', '- '],
  ['unchanged', '  '],
  ['updated', { add: '+ ', remove: '- ' }],
  ['nested', '  '],
]);

const render = (ast, level = 0) => {
  const space = '    '.repeat(level);
  const result = ast.map((node) => {
    const operation = operations.get(node.type);
    if (node.type === 'nested') {
      return [toString(space, operation, node.name, node.children, level, render)];
    }
    if (node.type === 'updated') {
      return [toString(space, operation.add, node.name, node.value.valueAfter, level, stringify),
        toString(space, operation.remove, node.name, node.value.valueBefore, level, stringify)];
    }
    return [toString(space, operation, node.name, node.value, level, stringify)];
  });

  return `{${_.flatten(result).join('')}\n${space}}`;
};

export default render;
