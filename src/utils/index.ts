export function enumValues<O extends object>(obj: O): string[] {
  return Object.values(obj);
}
