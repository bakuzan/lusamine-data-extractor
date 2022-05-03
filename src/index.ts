#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { Option, program } from 'commander';

import { Mode } from './constants/Mode';
import { enumValues } from './utils';

async function run() {
  console.log(
    chalk.green(
      figlet.textSync('Lusamine Data Extractor', { horizontalLayout: 'full' })
    )
  );

  program
    .version('0.0.1')
    .description('Migrate Json to SQLite DB')
    .addOption(
      new Option('-m, --mode <mode>', `Processor to run`).choices(
        enumValues(Mode)
      )
    )
    .parse(process.argv);
}

run();
