import renderSimple from './renderSimple';
import renderPlain from './renderPlain';

const outputFormats = {
  default: renderSimple,
  plain: renderPlain,
};

export default (ast, format) => outputFormats[format](ast);
