import db from '../database';

import { JsonFiles } from '../constants/JsonFiles';

import { Evolution, EvolutionJsonData } from '../types/Evolution';

import { readJsonFromFile } from '../utils/file';
import { debug } from '../utils/logger';

export default async function processor() {
  debug(`Processing evolutions...`);

  const pokemon = db.prepare(`SELECT * FROM Pokemon`).all();

  if (!pokemon.length) {
    debug(`Database has no pokemon and therefore cannot add evolutions.`);
    return;
  }

  const evolutions: Evolution[] = db.prepare(`SELECT * FROM Evolution`).all();
  const data = await readJsonFromFile<EvolutionJsonData[]>(
    JsonFiles.Evolutions
  );

  const hasEvolutionsWithoutExistingPokemon =
    data
      .reduce(
        (p, c) => [...p, c.nationalPokedexNumber, c.evolvesTo],
        [] as number[]
      )
      .filter((npn) => !pokemon.some((p) => p.NationalPokedexNumber === npn))
      .length > 0;

  if (hasEvolutionsWithoutExistingPokemon) {
    debug(
      `Database does not contain all the pokemon necessary to extract the evolutions.`,
      `\r\n`,
      `Please run "lde -m pokemon" to fix this.`
    );
    return;
  }

  const newEvolutions = data
    .map((x) => ({
      PokemonId: pokemon.find(
        (p) => p.NationalPokedexNumber === x.nationalPokedexNumber
      ).Id,
      EvolvesToPokemonId: pokemon.find(
        (p) => p.NationalPokedexNumber === x.evolvesTo
      ).Id,
      Mechanism: x.mechanism,
      Note: x.note
    }))
    .filter(
      (x) =>
        evolutions.findIndex(
          (y) =>
            y.PokemonId === x.PokemonId &&
            y.EvolvesToPokemonId === x.EvolvesToPokemonId &&
            y.Mechanism === x.Mechanism &&
            y.Note === x.Note
        ) === -1
    );

  debug(`${newEvolutions.length} Evolutions will be added.`);

  const insertEvolution = db.prepare(
    `INSERT INTO Evolution(PokemonId, EvolvesToPokemonId, Mechanism, Note) VALUES(@PokemonId, @EvolvesToPokemonId, @Mechanism, @Note)`
  );

  const insertEvolutions = db.transaction((evos: Evolution[]) => {
    for (const ev of evos) {
      insertEvolution.run(ev);
    }
  });

  insertEvolutions(newEvolutions);
}
