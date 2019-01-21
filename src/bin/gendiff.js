#!/usr/bin/env node
import program from 'commander';
import info from '../../package.json';
import genDiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version(info.version)
  .option('-f, --format [type]', 'Which type of format to use')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
