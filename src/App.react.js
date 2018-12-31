/* @flow */

import * as React from 'react';

import styles from './styles.css';

export type Props = {};

type State = {};

const HEIGHT = 400;
const WIDTH = 400;

const H_HEIGHT = HEIGHT / 2;
const H_WIDTH = WIDTH / 2;

export default class App extends React.Component<Props, State> {
  state = {};

  render() {
    return (
      <div className={styles.root}>
        <div style={{ margin: '16px 0' }}>
          <svg
            height={`${HEIGHT}`}
            width={`${WIDTH}`}
            style={{
              height: `${HEIGHT}px`,
              width: `${WIDTH}px`,
            }}>
            <path d={this._calculatePath()} fill="transparent" stroke="blue" />
          </svg>
        </div>
        <div
          style={{ backgroundColor: '#F0F0F0', flexGrow: 1, width: '100%' }}
        />
      </div>
    );
  }

  _calculatePath(): string {
    const points = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const angles = points.map(i => (i * Math.PI * 2) / 9);
    const midAngles = points.map(i => (Math.PI / 9) * (2 * i + 1));

    const center = { x: H_WIDTH, y: H_HEIGHT };
    const radius = Math.min(H_WIDTH, H_HEIGHT);

    const starPoints = angles.map(angle => ({
      x: center.x + Math.sin(angle) * radius,
      y: center.y - Math.cos(angle) * radius,
    }));

    const starPits = midAngles.map(angle => ({
      x: center.x + Math.sin(angle) * radius * 0.5,
      y: center.y - Math.cos(angle) * radius * 0.5,
    }));

    return points.reduce((path, i) => {
      const pi = i;
      const si = (i + 1) % 9;
      const part1 = `L ${starPits[pi].x} ${starPits[pi].y}`;
      const part2 = `L ${starPoints[si].x} ${starPoints[si].y}`;
      return `${path} ${part1} ${part2}`;
    }, `M ${starPoints[0].x} ${starPoints[0].y}`);
  }
}
