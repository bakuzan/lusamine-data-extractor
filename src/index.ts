#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { Option, program } from 'commander';

import { Mode } from './constants/Mode';
import { LDEOptions } from './constants/LDEOptions';

import processor from './processors';
import { enumValues } from './utils';
import { debug } from './utils/logger';

async function run() {
  console.log(
    chalk.green(
      figlet.textSync(`Lusamine Data\r\nExtractor`, {
        horizontalLayout: 'full',
        width: process.stdout.columns,
        whitespaceBreak: true
      })
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

  const options = program.opts() as LDEOptions;
  await processor(options.mode);

  debug(`Process Complete.`);
}

run();
