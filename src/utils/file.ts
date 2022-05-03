import fs from 'fs';

export async function readJsonFromFile<T>(filePath: string) {
  const stringy = fs.readFileSync(filePath, 'utf8').toString();
  return JSON.parse(stringy) as T;
}

export async function writeTextToFile(fileName: string, text: string) {
  const outputFilePath = `${fileName} output.txt`;
  fs.writeFileSync(outputFilePath, text);

  console.log(`Result output to: `, outputFilePath);
}
