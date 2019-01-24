import Node from './Node';

const levelUp = 1;
const newLine = '\n  ';
const operation = '+ ';

export default class extends Node {
  constructor(name, value, func, space, level) {
    super(name, value);
    this.space = space;
    this.func = func;
    this.level = level;
  }

  toString() {
    return `${newLine}${this.space}${operation}${this.name}: ${this.func(this.value, this.level + levelUp)}`;
  }

  toPLain(name) {
    const path = name.length === 0 ? this.name : `${name}.${this.name}`;
    return `Property '${path}' was added with value: ${this.func(this.value)}`;
  }
}
