export function enumValues<O extends object>(obj: O): string[] {
  return Object.values(obj);
}

export const capitalise = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const capitaliseEachWord = (str: string): string =>
  str.split(' ').map(capitalise).join(' ');
