import _ from 'lodash';

const levelUp = 1;

const getSpace = level => '    '.repeat(level);

const stringify = (value, level) => {
  const newLine = '\n';
  if (value instanceof Object) {
    const result = Object.keys(value)
      .map(key => [`${newLine}${getSpace(level + levelUp)}${key}: ${value[key]}`]);
    return `{${_.flatten(result).join('')}\n${getSpace(level)}}`;
  }
  return value;
};

const render = (ast, level = 0) => {
  const space = '    '.repeat(level);
  const newLine = '\n  ';
  const result = ast.map((node) => {
    switch (node.type) {
      case 'added':
        return [`${newLine}${space}+ ${node.name}: ${stringify(node.valueAfter, level + levelUp)}`];
      case 'deleted':
        return [`${newLine}${space}- ${node.name}: ${stringify(node.valueBefore, level + levelUp)}`];
      case 'changed':
        return [`${newLine}${space}+ ${node.name}: ${stringify(node.valueAfter, level + levelUp)}`,
          `${newLine}${space}- ${node.name}: ${stringify(node.valueBefore, level + levelUp)}`];
      case 'unchanged':
        return [`${newLine}${space}  ${node.name}: ${stringify(node.valueBefore, level + levelUp)}`];
      default:
        return [`${newLine}${space}  ${node.name}: ${render(node.children, level + levelUp)}`];
    }
  });

  return `{${_.flatten(result).join('')}\n${space}}`;
};

export default render;
