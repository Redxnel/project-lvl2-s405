import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers/index';
import buildDiffAST from './buildAST';

const genDiff = (path1, path2, format = 'default') => {
  const pathFormat1 = path.extname(path1);
  const pathFormat2 = path.extname(path2);

  const dataFromPath1 = parse(pathFormat1, fs.readFileSync(path1, 'utf-8'));
  const dataFromPath2 = parse(pathFormat2, fs.readFileSync(path2, 'utf-8'));

  const diffAST = buildDiffAST(dataFromPath1, dataFromPath2);

  return render(diffAST, format);
};

export default genDiff;
