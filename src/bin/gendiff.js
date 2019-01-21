#!/usr/bin/env node

const selectFlag = require('commander');

selectFlag
  .command('gendiff [options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option("-f, --format [type]", "Which type of result to use")
