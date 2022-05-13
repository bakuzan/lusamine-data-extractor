import Database from 'better-sqlite3';
import dotenv from 'dotenv';
// import { debug } from '../utils/logger';

import setupExecution from './setup';

dotenv.config();

if (!process.env.DATABASE_PATH) {
  throw new Error(`Environment Variable not set: DATABASE_PATH`);
}

const db = new Database(process.env.DATABASE_PATH, {});
const scripts = setupExecution();

for (const item of scripts) {
  // debug(`Executing ${item.name}...`);
  db.exec(item.script);
}

export default db;
