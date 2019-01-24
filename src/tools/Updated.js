import Node from './Node';

const levelUp = 1;
const newLine = '\n  ';
const operation = { add: '+ ', remove: '- ' };

export default class extends Node {
  constructor(name, value, func, space, level) {
    super(name, value);
    this.space = space;
    this.func = func;
    this.level = level;
  }

  toString() {
    return `${newLine}${this.space}${operation.add}${this.name}: ${this.func(this.value.valueAfter, this.level + levelUp)}`
    + `${newLine}${this.space}${operation.remove}${this.name}: ${this.func(this.value.valueBefore, this.level + levelUp)}`;
  }

  toPLain(name) {
    const path = name.length === 0 ? this.name : `${name}.${this.name}`;
    return `Property '${path}' was updated. From ${this.func(this.value.valueBefore)} to ${this.func(this.value.valueAfter)}`;
  }
}
