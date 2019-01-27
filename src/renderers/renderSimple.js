import _ from 'lodash';

const depthUp = 1;

const getSpaces = depth => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  return `{\n${Object.keys(value)
    .map(key => `${getSpaces(depth + depthUp)}${key}: ${value[key]}`)
    .join('\n')}\n${getSpaces(depth)}}`;
};

const propertyActions = {
  added: (obj, depth) => `  ${getSpaces(depth)}+ ${obj.name}: ${stringify(obj.valueAfter, depth + depthUp)}`,
  updated: (obj, depth) => [`  ${getSpaces(depth)}+ ${obj.name}: ${stringify(obj.valueAfter, depth + depthUp)}`,
    `  ${getSpaces(depth)}- ${obj.name}: ${stringify(obj.valueBefore, depth + depthUp)}`],
  removed: (obj, depth) => `  ${getSpaces(depth)}- ${obj.name}: ${stringify(obj.valueBefore, depth + depthUp)}`,
  nested: (obj, depth, render) => `${getSpaces(depth + depthUp)}${obj.name}: ${render(obj.children, depth + depthUp)}`,
  unchanged: (obj, depth) => `${getSpaces(depth + depthUp)}${obj.name}: ${stringify(obj.valueBefore, depth + depthUp)}`,
};

const render = (ast, depth = 0) => {
  const result = ast.map(node => propertyActions[node.type](node, depth, render));
  return `{\n${_.flatten(result).join('\n')}\n${getSpaces(depth)}}`;
};

export default render;
