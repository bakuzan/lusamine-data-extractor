const GEN2_START = 152;
const GEN3_START = 252;
const GEN4_START = 387;
const GEN5_START = 494;
const GEN6_START = 650;
const GEN7_START = 722;
const GEN8_START = 810;

export default function getGeneration(dexNum: number) {
  if (dexNum < GEN2_START) return 1;
  if (dexNum < GEN3_START) return 2;
  if (dexNum < GEN4_START) return 3;
  if (dexNum < GEN5_START) return 4;
  if (dexNum < GEN6_START) return 5;
  if (dexNum < GEN7_START) return 6;
  if (dexNum < GEN8_START) return 7;
  return 8;
}
