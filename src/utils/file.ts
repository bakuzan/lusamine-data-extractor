import fs from 'fs';
import path from 'path';

export async function readJsonFromFile<T>(filename: string) {
  if (!process.env.RAW_FOLDER_PATH) {
    throw new Error(`Environment Variable not set: RAW_FOLDER_PATH`);
  }

  const jsonLocation = process.env.RAW_FOLDER_PATH;
  const filePath = path.resolve(path.join(jsonLocation, filename));
  const stringy = fs.readFileSync(filePath, 'utf8').toString();
  return JSON.parse(stringy) as T;
}
