import Database from 'better-sqlite3';
import dotenv from 'dotenv';

import setupExecution from './setup';

dotenv.config();

if (!process.env.DATABASE_PATH) {
  throw new Error(`Environment Variable not set: DATABASE_PATH`);
}

const db = new Database(process.env.DATABASE_PATH, {});
const scripts = setupExecution();
db.exec(scripts);

export default db;
