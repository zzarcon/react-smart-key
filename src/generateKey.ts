// we try to start from a not already used key
let lastKey = new Date().getTime();
const globalCache: Map<any, string> = new Map();

const getKey = (object: any, cache: Map<any, string>): string => {
  switch (typeof object) {
    case 'object': case 'function':
      const currentKey = cache.get(object);
      if (currentKey) { return currentKey; }
      
      lastKey++; // We want to increment the key before using it
      const newKey = `${lastKey}`;
      cache.set(object, newKey);
      return newKey;
    case 'symbol':
      return object.toString();
    default: // string, number, boolean, symbol
      return `${object}`;
  }
}

export const generateKey = (object: any): string => {
  return getKey(object, globalCache);
}

export const generateLocalKey = () => {
  const cache: Map<any, string> = new Map();

  return (object: any): string => {
    return getKey(object, cache);
  }
}