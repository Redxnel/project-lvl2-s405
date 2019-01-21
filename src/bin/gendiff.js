#!/usr/bin/env node
import info from '../../package.json';

const program = require('commander');

program
  .command('gendiff <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version(info.version)
  .option('-f, --format [type]', 'Which type of format to use')
  .parse(process.argv);
