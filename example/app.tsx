import * as React from 'react';
import {Component} from 'react';
import {GHCorner} from 'react-gh-corner';
import generateKey from '../src';
import {AppWrapper} from './styled';

const repoUrl = 'https://github.com/zzarcon/react-smart-key';
const items = [1, '2', 'a', true, false, () => {}, Promise.resolve('a')];
export default class App extends Component {
  render() {
    const list = items.map((item) => {
      return (
        <li key={generateKey(item)}>
          {`${item}`}
        </li>
      )
    });

    return (
      <AppWrapper>
        <GHCorner openInNewTab href={repoUrl} />
        <ul>
          {list}
        </ul>
      </AppWrapper>
    )
  }
}