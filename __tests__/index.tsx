import { generateKey } from "../src/generateKey";

describe('generateKey', () => {
  it('strings', () => {
    expect(generateKey('1')).toEqual('1');
    expect(generateKey('a')).toEqual('a');
    expect(generateKey('a')).toEqual(generateKey('a'));
  });
});
