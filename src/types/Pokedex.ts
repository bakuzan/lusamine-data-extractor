export interface Pokedex {
  Id: number;
  Code: string;
  Name: string;
  RegionId: number;
}

export interface PokedexForm {
  PokedexId: number;
  PokemonFormId: number;
  RegionalPokedexNumber: number;
}

export interface PokedexLinkJson {
  region: number;
  regionalPokedexNumber: number;
  nationalPokedexNumber: number;
  formSuffix: string;
  isVariant: boolean;
}
