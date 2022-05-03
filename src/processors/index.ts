import { Mode } from '../constants/Mode';

import processTypes from './types';

export default async function processor(mode: Mode) {
  switch (mode) {
    case Mode.ImportTypes:
      await processTypes();
      break;
    default:
      throw new Error(
        `No implementation for Mode : ${mode.toString()} was found.`
      );
  }
}
