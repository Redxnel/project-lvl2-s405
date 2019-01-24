export default class Node {
  constructor(name, value, type, children = []) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.children = children;
  }
}
