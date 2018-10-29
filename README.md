# react-smart-key [![Build Status](https://travis-ci.org/zzarcon/react-smart-key.svg?branch=master)](https://travis-ci.org/zzarcon/react-smart-key)
> Pass whatever as key without re renders

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

The best way to pick a key is to use a **string that uniquely identifies** a list item among its siblings. When iterating over non simple values like promises or class instances, it can be tricky to find the right key for the items while keeping a consistent and predictable renders.

That's what **react-smart-key** solves.

## Install

```
$ yarn add react-smart-key
```

## Usage 

**simple**

It will keep a global key cache which will last as long as your app runs

```typescript
import generateKey from 'react-smart-key';

const promise = Promise.resolve(1);
const foo = () => {};

generateKey(promise) === generateKey(promise) // true
generateKey(promise) === generateKey(Promise.resolve(1)) // false
generateKey(foo) === generateKey(foo) // true
generateKey(foo) === generateKey(() => {}) // false
```

**Full**

This example illustrates different kind of items and how it will always return the same key for each of them.

```jsx
const items = [
  () => {}, 
  Promise.resolve('a'),
  Promise.resolve(1),
  new Date(),
  function a() {},
  1,
  "2"
];
    
class App extends Component {
  render() {
    const list = items.map((item) => <li key={generateKey(item)} />);

    return <ul>{list}</ul>
  }
}
```

**locally**

Sometimes, you want to have a per component unique cache. In this case, you can use **generateLocalKey** which encapsulates a local cache (this also helps garbage collection).

```jsx
import {generateLocalKey} from 'react-smart-key';
    
class Component1 extends Component {
  constructor() {
    this.generateKey = generateLocalKey();
  }

  render() {
    const list = [1,2,3].map((item) => 
      <li key={this.generateKey(item)} />
    );

    return <ul>{list}</ul>
  }
}

class Component2 extends Component {
  constructor() {
    this.generateKey = generateLocalKey();
  }

  render() {
    const list = ['a', 'b'].map((item) => 
      <li key={this.generateKey(item)} />
    );

    return <ul>{list}</ul>
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Component1 />
        <Component2 />
      </div>
    )
  }
}

```