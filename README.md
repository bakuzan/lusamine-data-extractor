# Lusamine Data Extractor

Tool to migrate pokemon json data from [Lusamine](https://github.com/bakuzan/lusamine/) into a freshly created sqlite db.

## Usage

### Pre-requistes

1. Git clone `this` repo
1. `npm install`
1. Git clone [Lusamine](https://github.com/bakuzan/lusamine/)
1. Create a `.env` file using the `.env.example` file as a guide (detailed instructions are in the table below).

### .env Guide

| Variable Name   | Description                                                                 | Example Value                                   |
| --------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| DATABASE_PATH   | Path to an existing `pokemon.db` or where you would like one to be created. | ./pokemon.db                                    |
| RAW_FOLDER_PATH | Path to the Lusamine raw data directory.                                    | C:\\some-folder\\repos\\`lusamine\src\data\raw` |
|                 |                                                                             |                                                 |

### Development

1. In your `lusamine-data-extractor` working directory
1. `npm run build`
1. `npm link`
1. `lde --help`
