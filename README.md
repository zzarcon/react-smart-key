# react-smart-key [![Build Status](https://travis-ci.org/zzarcon/react-smart-key.svg?branch=master)](https://travis-ci.org/zzarcon/react-smart-key)
> Pass whatever as key without re renders

# Install

```
$ yarn add react-smart-key
```

# Usage 

**simple**

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

```typescript
export default class App extends Component {
  render() {
    const items = [1, '2', 'a', true, false, () => {}, Promise.resolve('a')];
    const list = items.map((item) => {
      return (
        <li key={generateKey(item)}>
          {`${item}`}
        </li>
      )
    });

    return (
      <ul>
        {list}
      </ul>
    )
  }
}
```