import db from '../database';

import { JsonFiles } from '../constants/JsonFiles';
import { FormInstanceType } from '../constants/FormInstanceType';
import {
  PokemonData,
  PokemonFormData,
  NewFormData,
  PokemonJsonData,
  MegaJsonData,
  VariantJsonData
} from '../types/Pokemon';

import { capitalise } from '../utils';
import { readJsonFromFile } from '../utils/file';
import { debug } from '../utils/logger';
import getGeneration from '../utils/getGeneration';

export default async function processor() {
  const pokemon: PokemonData[] = db.prepare(`SELECT * FROM Pokemon`).all();
  const pokeData = await readJsonFromFile<PokemonJsonData[]>(JsonFiles.Pokemon);

  // Check and insert pokemon
  const newPokemon = pokeData.filter(
    (x, i, a) =>
      x.form === '' &&
      a.findIndex(
        (y) => x.nationalPokedexNumber === y.nationalPokedexNumber
      ) === i &&
      !pokemon.some((y) => x.nationalPokedexNumber === y.NationalPokedexNumber)
  );

  if (pokemon.length) {
    debug(`Database already contains Pokemon.`);
  }

  if (newPokemon.length) {
    debug(`${newPokemon.length} new pokemon will be added.`);

    const insertPokemon = db.prepare(
      `INSERT INTO Pokemon(NationalPokedexNumber, Name, GenerationId) VALUES(@NationalPokedexNumber, @Name, @GenerationId)`
    );

    const insertPokemons = db.transaction((pokes: PokemonData[]) => {
      for (const poke of pokes) {
        insertPokemon.run(poke);
      }
    });

    insertPokemons(
      newPokemon.map((x) => ({
        NationalPokedexNumber: x.nationalPokedexNumber,
        Name: capitalise(x.name.trim()),
        GenerationId: getGeneration(x.nationalPokedexNumber)
      }))
    );
  } else {
    debug(`No new pokemon will be added.`);
  }

  // Check and insert forms -> requires pokemon, megas and variants json
  const forms: PokemonFormData[] = db
    .prepare(
      `SELECT *, NationalPokedexNumber FROM Form f JOIN Pokemon p ON f.PokemonId = p.Id`
    )
    .all();

  if (forms.length) {
    debug(`Database already contains forms.`);
  }

  const newPokemonForms: NewFormData[] = [];
  newPokemonForms.push(
    ...pokeData
      .filter(
        (x) =>
          !forms.some(
            (y) =>
              x.nationalPokedexNumber === y.NationalPokedexNumber &&
              ((x.form === '' && y.Description === null) ||
                x.form === y.Description)
          )
      )
      .map((x) => ({
        NationalPokedexNumber: x.nationalPokedexNumber,
        PokemonId: null,
        InstanceType:
          x.form === '' ? FormInstanceType.Base : FormInstanceType.Alternate,
        Description: x.form,
        RegionId: null,
        TypeIds: x.typeIds
      }))
  );

  const megaData = await readJsonFromFile<MegaJsonData[]>(
    JsonFiles.MegaEvolutions
  );

  newPokemonForms.push(
    ...megaData
      .filter(
        (x) =>
          !forms.some(
            (y) =>
              x.nationalPokedexNumber === y.NationalPokedexNumber &&
              ((x.suffix === '' && y.Description === null) ||
                x.suffix === y.Description)
          )
      )
      .map((x) => ({
        NationalPokedexNumber: x.nationalPokedexNumber,
        PokemonId: null,
        InstanceType: FormInstanceType.Mega,
        Description: x.suffix,
        RegionId: null,
        TypeIds: x.typeIds
      }))
  );

  const variData = await readJsonFromFile<VariantJsonData[]>(
    JsonFiles.Variants
  );

  newPokemonForms.push(
    ...variData
      .filter(
        (x) =>
          !forms.some(
            (y) =>
              x.nationalPokedexNumber === y.NationalPokedexNumber &&
              x.regionId === y.RegionId &&
              ((x.form === '' && y.Description === null) ||
                x.form === y.Description)
          )
      )
      .map((x) => ({
        NationalPokedexNumber: x.nationalPokedexNumber,
        PokemonId: null,
        InstanceType: FormInstanceType.Variant,
        Description: x.form,
        RegionId: x.regionId,
        TypeIds: x.typeIds
      }))
  );

  if (newPokemonForms.length) {
    debug(`${newPokemonForms.length} new pokemon forms will be added.`);

    const insertForm = db.prepare(
      `INSERT INTO Form(PokemonId, InstanceType, RegionId, Description) VALUES(@PokemonId, @InstanceType, @RegionId, @Description)`
    );

    const insertFormType = db.prepare(
      `INSERT INTO FormType (FormId, TypeId) VALUES (@FormId, @TypeId)`
    );

    const insertForms = db.transaction((pokes: NewFormData[]) => {
      for (const poke of pokes) {
        const item = db
          .prepare(`SELECT * FROM Pokemon WHERE NationalPokedexNumber = ?`)
          .get(poke.NationalPokedexNumber);

        const result = insertForm.run({
          PokemonId: item.Id,
          InstanceType: poke.InstanceType,
          Description: poke.Description?.trim() || null,
          RegionId: poke.RegionId || null
        });

        for (const typeId of poke.TypeIds) {
          insertFormType.run({
            FormId: result.lastInsertRowid,
            TypeId: typeId
          });
        }
      }
    });

    insertForms(newPokemonForms);
  } else {
    debug(`No new pokemon forms will be added.`);
  }
}
