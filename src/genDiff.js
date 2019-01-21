import fs from 'fs';
import _ from 'lodash';

const parseJSON = data => JSON.parse(data);

const genDiff = (path1, path2) => {
  const data1 = fs.readFileSync(path1, 'utf-8');
  const data2 = fs.readFileSync(path2, 'utf-8');

  const obj1 = parseJSON(data1);
  const obj2 = parseJSON(data2);

  const keysFromObj1 = Object.keys(obj1);
  const keysFromObj2 = Object.keys(obj2);

  const result = keysFromObj1.reduce((acc, key) => {
    if (_.has(obj2, key)) {
      return obj2[key] === obj1[key]
        ? { ...acc, [`  ${key}`]: obj1[key] } : { ...acc, [`+ ${key}`]: obj2[key], [`- ${key}`]: obj1[key] };
    }
    return { ...acc, [`- ${key}`]: obj1[key] };
  }, {});

  return keysFromObj2.reduce((acc, key) => (_.has(obj1, key)
    ? acc : { ...acc, [`+ ${key}`]: obj2[key] }), result);
};

export default genDiff;
