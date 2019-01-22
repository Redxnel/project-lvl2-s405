import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const format = {
  '.json': configPath => JSON.parse(configPath),
  '.yml': configPath => yaml.safeLoad(configPath),
};

export default (configPath) => {
  const data = fs.readFileSync(configPath, 'utf-8');
  const ext = path.extname(configPath);
  return format[ext](data);
};
