import db from '../database';

import { JsonFiles } from '../constants/JsonFiles';

import { readJsonFromFile } from '../utils/file';
import { debug } from '../utils/logger';

export default async function processor() {
  debug(`Processing starters...`);

  const pokemon = db.prepare(`SELECT * FROM Pokemon`).all();
  const starters = db.prepare(`SELECT * FROM Starter`).all();

  if (!pokemon.length) {
    debug(`Database has no pokemon and therefore cannot add starters.`);
    return;
  }

  if (starters.length) {
    debug(`Database contains Starters. Deleting all starters...`);
    db.prepare(`DELETE FROM Starter`).run();
  }

  const data = await readJsonFromFile<number[]>(JsonFiles.Starters);

  debug(`${data.length} Starters will be added.`);

  const insertStarter = db.prepare(`INSERT INTO Starter(PokemonId) VALUES(?)`);
  const insertStarters = db.transaction((starters: number[]) => {
    for (const start of starters) {
      insertStarter.run(start);
    }
  });

  insertStarters(data);
}
