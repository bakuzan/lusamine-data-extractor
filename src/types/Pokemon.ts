import { FormInstanceType } from '../constants/FormInstanceType';

export interface PokemonData {
  NationalPokedexNumber: number;
  Name: string;
  GenerationId: number;
}

export interface PokemonFormData {
  NationalPokedexNumber: number;
  PokemonId: number;
  InstanceType: FormInstanceType;
  Description: string | null;
  RegionId: number | null;
}

export interface NewFormData {
  NationalPokedexNumber: number;
  PokemonId: number | null;
  InstanceType: FormInstanceType;
  Description: string | null;
  RegionId: number | null;
  TypeIds: number[];
}

export interface PokemonJsonData {
  nationalPokedexNumber: number;
  name: string;
  generationId: number;
  typeIds: number[];
  form: string;
}

export interface MegaJsonData {
  nationalPokedexNumber: number;
  suffix: string;
  typeIds: number[];
  introduced: string;
}

export interface VariantJsonData {
  nationalPokedexNumber: number;
  regionId: number;
  typeIds: number[];
  form: string | null;
}
