#!/usr/bin/env node
import info from '../../package.json';

const program = require('commander');

program
  .version(info.version)
  .command('gendiff <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Which type of format to use')
  .parse(process.argv);
