import { FormInstanceType } from '../constants/FormInstanceType';

import { PokemonFormData } from '../types/Pokemon';
import { PokedexLinkJson } from '../types/Pokedex';

import { debug } from './logger';

const PIKACHU = 25;

const TORNADUS = 641;
const THUNDURUS = 642;
const LANDORUS = 645;
const KYUREM = 646;
const KELDEO = 647;

const MEOWSTIC = 678;
const NECROZMA = 800;
const TOXTRICITY = 849;
const INDEEDEE = 876;

const silentlySkipForms = [
  PIKACHU,
  TORNADUS,
  THUNDURUS,
  LANDORUS,
  KYUREM,
  KELDEO,
  MEOWSTIC,
  NECROZMA,
  TOXTRICITY,
  INDEEDEE
];

const URSHIFU = 892;

const noBaseForm = [URSHIFU];

function getFormRuleSettings(d: PokedexLinkJson) {
  return {
    skip: silentlySkipForms.includes(d.nationalPokedexNumber) && d.formSuffix,
    custom: noBaseForm.includes(d.nationalPokedexNumber) || d.isVariant
  };
}

function customFormFinder(forms: PokemonFormData[], d: PokedexLinkJson) {
  const fs = forms.filter(
    (x) =>
      x.NationalPokedexNumber === d.nationalPokedexNumber &&
      ((d.isVariant && x.InstanceType === FormInstanceType.Variant) ||
        (!d.isVariant && x.InstanceType !== FormInstanceType.Variant))
  );

  const idx = d.formSuffix ? Number(d.formSuffix.slice(1)) : 0;
  return fs[idx];
}

function standardFormFinder(forms: PokemonFormData[], d: PokedexLinkJson) {
  let form = null;

  const fs = forms.filter(
    (x) => d.nationalPokedexNumber === x.NationalPokedexNumber
  );

  if (!d.formSuffix) {
    form = fs.find((x) => !x.Description);
  } else {
    form = fs[Number(d.formSuffix.slice(1))];
  }

  if (!form) {
    debug(`Pokemon Json couldn't find a match in Form table.\r\n`, {
      importInfo: d,
      fullFilteredForms: fs,
      npnFilteredForms: forms.filter(
        (x) => x.NationalPokedexNumber === d.nationalPokedexNumber
      )
    });
  }

  return form;
}

export default function findFormForJsonData(
  forms: PokemonFormData[],
  d: PokedexLinkJson
) {
  const rules = getFormRuleSettings(d);
  if (rules.skip) {
    return;
  }

  return rules.custom
    ? customFormFinder(forms, d)
    : standardFormFinder(forms, d);
}
