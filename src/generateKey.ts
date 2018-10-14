let lastKey = 1;
const identifiersMap: Map<Promise<any>, string> = new Map();

export const generateKey = (object: any): string => {
  switch (typeof object) {
    case 'string':
      return object;
    case 'number': 
      return `${object}`;
    case 'object': case 'function':
      const currentKey = identifiersMap.get(object);
      if (currentKey) {
        return currentKey;
      }
      // We want to increment the key before using it
      lastKey++;
      const newKey = `${lastKey}`;
      identifiersMap.set(object, newKey);
      return newKey;
  }
}