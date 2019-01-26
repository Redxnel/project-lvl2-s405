import _ from 'lodash';

const depthUp = 1;

const getSpaces = depth => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (value instanceof Object) {
    return `{${Object
      .keys(value)
      .map(key => `\n${getSpaces(depth + depthUp)}${key}: ${value[key]}`)
      .join('')}\n${getSpaces(depth)}}`;
  }
  return value;
};

const propertyActions = {
  added: (obj, depth) => `\n  ${getSpaces(depth)}+ ${obj.name}: ${stringify(obj.value, depth + depthUp)}`,
  updated: (obj, depth) => `\n  ${getSpaces(depth)}+ ${obj.name}: ${stringify(obj.value.valueAfter, depth + depthUp)}`
    + `\n  ${getSpaces(depth)}- ${obj.name}: ${stringify(obj.value.valueBefore, depth + depthUp)}`,
  removed: (obj, depth) => `\n  ${getSpaces(depth)}- ${obj.name}: ${stringify(obj.value, depth + depthUp)}`,
  nested: (obj, depth, render) => `\n  ${getSpaces(depth)}  ${obj.name}: ${render(obj.children, depth + depthUp)}`,
  unchanged: (obj, depth) => `\n  ${getSpaces(depth)}  ${obj.name}: ${stringify(obj.value, depth + depthUp)}`,
};

const render = (ast, depth = 0) => `{${ast
  .map(node => propertyActions[node.type](node, depth, render))
  .join('')}\n${getSpaces(depth)}}`;

export default render;
