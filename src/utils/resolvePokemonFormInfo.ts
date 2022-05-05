import { PokemonJsonData } from '../types/Pokemon';

const KYOGRE = 382;
const GROUDON = 383;

const PrimalForms = [KYOGRE, GROUDON];

export default function resolvePokemonFormInfo(pokemon: PokemonJsonData) {
  if (pokemon.form) {
    return pokemon.form;
  }

  const npn = pokemon.nationalPokedexNumber;
  if (PrimalForms.includes(npn) && pokemon.name.includes('primal')) {
    return 'primal';
  }

  return pokemon.form;
}
