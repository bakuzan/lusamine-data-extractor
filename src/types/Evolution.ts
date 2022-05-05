export interface Evolution {
  PokemonId: number;
  EvolvesToPokemonId: number;
  Mechanism: number;
  Note: string;
}

export interface EvolutionJsonData {
  nationalPokedexNumber: number;
  evolvesTo: number;
  mechanism: number;
  note: string;
}
