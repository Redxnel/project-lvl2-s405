import _ from 'lodash';

const levelUp = 1;

const getSpace = level => '    '.repeat(level);

const stringify = (value, level) => {
  if (value instanceof Object) {
    const result = Object.keys(value)
      .map(key => [`\n${getSpace(level + levelUp)}${key}: ${value[key]}`]);
    return `{${_.flatten(result).join('')}\n${getSpace(level)}}`;
  }
  return value;
};

const toString = (newLine, space, operation, name, value, level, func) => `${newLine}${space}${operation}${name}: ${func(value, level + levelUp)}`;

const operations = new Map([
  ['added', '+ '],
  ['deleted', '- '],
  ['unchanged', '  '],
]);

const render = (ast, level = 0) => {
  const space = '    '.repeat(level);
  const newLine = '\n  ';
  const result = ast.map((node) => {
    const operation = operations.get(node.type);
    if (node.children) {
      return [toString(newLine, space, operation, node.name, node.children, level, render)];
    }
    return [toString(newLine, space, operation, node.name, node.value, level, stringify)];
  });

  return `{${_.flatten(result).join('')}\n${space}}`;
};

export default render;
