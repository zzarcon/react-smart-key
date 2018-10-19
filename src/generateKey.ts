// we try to start from a not already used key
let lastKey = new Date().getTime();
const identifiersMap: Map<Promise<any>, string> = new Map();

export const generateKey = (object: any): string => {
  switch (typeof object) {
    case 'object': case 'function':
      const currentKey = identifiersMap.get(object);
      if (currentKey) { return currentKey; }
      
      lastKey++; // We want to increment the key before using it
      const newKey = `${lastKey}`;
      identifiersMap.set(object, newKey);
      return newKey;
    case 'symbol':
      return object.toString();
    default: // Cover string, number, boolean, symbol
      return `${object}`;
  }
}