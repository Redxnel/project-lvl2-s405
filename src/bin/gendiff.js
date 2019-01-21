#!/usr/bin/env node
import version from '../../package.json';

const program = require('commander');

program
  .version(version)
  .command('gendiff <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Which type of format to use')
  .parse(process.argv);
