import fs from 'fs';

export async function readJsonFromFile(filePath: string) {
  const searilised = fs.readFileSync(filePath, 'utf8').toString();
  return JSON.parse(searilised);
}

export async function writeTextToFile(fileName: string, text: string) {
  const outputFilePath = `${fileName} output.txt`;
  fs.writeFileSync(outputFilePath, text);

  console.log(`Result output to: `, outputFilePath);
}
