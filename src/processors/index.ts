import { Mode } from '../constants/Mode';

import processTypes from './types';
import processPokemon from './pokemon';
import processStarters from './starters';
import processEvolutions from './evolutions';
import processPokedexes from './pokedexes';

export default async function processor(mode: Mode) {
  switch (mode) {
    case Mode.ImportTypes:
      await processTypes();
      break;
    case Mode.ImportPokemon:
      await processPokemon();
      break;
    case Mode.ImportStarters:
      await processStarters();
      break;
    case Mode.ImportEvolutions:
      await processEvolutions();
      break;
    case Mode.ImportPokedexes:
      await processPokedexes();
      break;
    case Mode.ImportAll:
      await processTypes();
      await processPokemon();
      await processStarters();
      await processEvolutions();
      await processPokedexes();
      break;
    default:
      throw new Error(
        `No implementation for Mode : ${(mode as Mode).toString()} was found.`
      );
  }
}
