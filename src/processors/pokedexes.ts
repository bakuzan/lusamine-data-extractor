import db from '../database';

import { PokedexJsonFiles } from '../constants/JsonFiles';

import { PokemonFormData } from '../types/Pokemon';
import { Pokedex, PokedexForm, PokedexLinkJson } from '../types/Pokedex';

import { readJsonFromFile } from '../utils/file';
import { debug } from '../utils/logger';
import { enumValues } from '../utils';
import findFormForJsonData from '../utils/findFormForJsonData';

export default async function processor() {
  debug(`Processing pokdexes...`);

  const forms: PokemonFormData[] = db
    .prepare(
      `SELECT f.*, NationalPokedexNumber 
         FROM Form f 
         JOIN Pokemon p ON f.PokemonId = p.Id
        WHERE InstanceType <> 4` // Exclude megas
    )
    .all();

  if (!forms.length) {
    debug(`Database has no pokemon forms and therefore cannot add pokedexes.`);
    return;
  }

  const pokedexes: Pokedex[] = db
    .prepare(`SELECT * FROM Pokedex WHERE RegionId IS NOT NULL`)
    .all();

  if (!pokedexes.length) {
    debug(`Database contains no pokedexes. Unable to import related pokemon.`);
    return;
  }

  const pokedexLinks: PokedexForm[] = [];

  // Read dex files and map them to pokedex entry
  for (const code of enumValues(PokedexJsonFiles)) {
    const dex = pokedexes.find((x) => `${x.Code}.json` === code);

    if (!dex) {
      debug(
        `Pokedex entry that matches a json file not found for code: ${code}`
      );
      continue;
    }

    const data = await readJsonFromFile<PokedexLinkJson[]>(code, true);
    debug(`Iterating ${code}...`);

    data.forEach((d) => {
      const form = findFormForJsonData(forms, d);

      if (form) {
        pokedexLinks.push({
          PokedexId: dex.Id,
          PokemonFormId: form.Id,
          RegionalPokedexNumber: d.regionalPokedexNumber
        });
      }
    });
  }

  // Perform the 'pre-built' inserts
  const insertPokedexForm = db.prepare(
    `INSERT INTO PokedexForm(PokedexId, PokemonFormId, RegionalPokedexNumber) VALUES(@PokedexId, @PokemonFormId, @RegionalPokedexNumber)`
  );

  const insertPokedexForms = db.transaction((links: PokedexForm[]) => {
    for (const l of links) {
      insertPokedexForm.run(l);
    }
  });

  insertPokedexForms(
    pokedexLinks.filter(
      (x, i, a) =>
        a.findIndex(
          (y) =>
            x.PokedexId === y.PokedexId &&
            x.PokemonFormId === y.PokemonFormId &&
            x.RegionalPokedexNumber === y.RegionalPokedexNumber
        ) === i
    )
  );
}
