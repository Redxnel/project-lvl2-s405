import _ from 'lodash';

const levelUp = 1;

const getSpace = level => '    '.repeat(level);

export const stringify = (value, level) => {
  if (value instanceof Object) {
    const result = Object.keys(value)
      .map(key => [`\n${getSpace(level + levelUp)}${key}: ${value[key]}`]);
    return `{${_.flatten(result).join('')}\n${getSpace(level)}}`;
  }
  return value;
};

export const selectValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};
