import path from 'path';
import fs from 'fs';

const targetFolder = 'src/database/scripts';

export function readSQLFiles() {
  try {
    const filenames = fs
      .readdirSync(targetFolder)
      .sort((a, b) => b.localeCompare(a));

    return filenames
      .filter((x) => x.endsWith('sql'))
      .map((filename) => {
        const content = fs.readFileSync(
          path.join(targetFolder, filename),
          'utf-8'
        );

        return content.toString();
      });
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to read SQL files`);
  }
}

export default function setupExecution() {
  return readSQLFiles().join('\r\n');
}
