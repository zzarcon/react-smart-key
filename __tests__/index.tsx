import { generateKey } from "../src";

describe('generateKey', () => {
  it('string', () => {
    expect(generateKey('1')).toEqual('1');
    expect(generateKey('a')).toEqual('a');
    expect(generateKey('a')).toEqual(generateKey('a'));
  });

  it('number', () => {
    expect(generateKey(1)).toEqual('1');
    expect(generateKey(2)).toEqual('2');
    expect(generateKey(2)).toEqual(generateKey(2));
  });

  it('function', () => {
    const foo = () => {};
    const bar = () => {};

    expect(generateKey(foo)).toEqual(generateKey(foo));
    expect(generateKey(bar)).toEqual(generateKey(bar));
    expect(generateKey(foo)).not.toEqual(generateKey(bar));
    expect(generateKey(() => {})).not.toEqual(generateKey(() => {}));
    expect(generateKey(function a () {})).not.toEqual(generateKey(function a () {}));
  });

  it('object', () => {
    class A {

    }

    const a = new A();
    const promise = new Promise(resolve => {resolve()});
    const resolved = Promise.resolve(2);

    expect(generateKey(a)).toEqual(generateKey(a));
    expect(generateKey(resolved)).toEqual(generateKey(resolved));
    expect(generateKey(promise)).toEqual(generateKey(promise));
    expect(generateKey(new A())).not.toEqual(new A());
    expect(generateKey(Promise.resolve('1'))).not.toEqual(Promise.resolve('1'));
  });

  it('boolean', () => {
    expect(generateKey(true)).toEqual('true');
    expect(generateKey(false)).toEqual('false');
    expect(generateKey(true)).toEqual(generateKey(true));
  });

  it('symbol', () => {
    expect(generateKey(Symbol('a'))).toEqual("Symbol(a)");
    expect(generateKey(Symbol(1))).toEqual("Symbol(1)");
    expect(generateKey(Symbol('b'))).toEqual(generateKey(Symbol('b')));
  });
});
