/* @flow */

import * as React from 'react';

import styles from './styles.css';

export type Props = {};

type State = {};

export default class App extends React.Component<Props, State> {
  state = {
    editorState: EditorState.createEmpty(),
  };

  render() {
    return <div className={styles.root} />;
  }
}
