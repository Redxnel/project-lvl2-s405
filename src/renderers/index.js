import renderSimple from './renderSimple';
import renderPlain from './renderPlain';
import renderJSON from './renderJSON';

const outputFormats = {
  default: renderSimple,
  plain: renderPlain,
  json: renderJSON,
};

export default (ast, format) => outputFormats[format](ast);
