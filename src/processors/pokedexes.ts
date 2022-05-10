import db from '../database';

import { PokedexJsonFiles } from '../constants/JsonFiles';
import { FormInstanceType } from '../constants/FormInstanceType';

import { readJsonFromFile } from '../utils/file';
import { debug } from '../utils/logger';
import { enumValues } from '../utils';
import { PokemonFormData } from '../types/Pokemon';
import { Pokedex, PokedexForm, PokedexLinkJson } from '../types/Pokedex';

export default async function processor() {
  debug(`Processing pokdexes...`);

  const forms: PokemonFormData[] = db
    .prepare(
      `SELECT *, NationalPokedexNumber 
         FROM Form f 
         JOIN Pokemon p ON f.PokemonId = p.Id
        WHERE InstanceType <> 3`
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

    const data = await readJsonFromFile<PokedexLinkJson[]>(code);
    debug(`Iterating ${code}...`);

    data.forEach((d) => {
      let form = null;

      const fs = forms.filter(
        (x) =>
          d.nationalPokedexNumber === x.NationalPokedexNumber &&
          ((d.isVariant && x.InstanceType === FormInstanceType.Variant) ||
            (!d.isVariant && x.InstanceType !== FormInstanceType.Variant))
      );

      if (!d.formSuffix) {
        form = fs.find((x) => x.Description === null);
      } else {
        form = fs[Number(d.formSuffix.slice(1))];
      }

      if (!form) {
        debug(`Pokemon Json couldn't find a match in Form table.`, data);
      } else {
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

  insertPokedexForms(pokedexLinks);
}
