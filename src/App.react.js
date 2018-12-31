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
  _pathRef: * = React.createRef();
  _rotationRadians: number = 0;

  state = {};

  _onChangeRotation = (event: *): void => {
    const { value } = event.target;
    const degrees = parseInt(value, 10);
    if (Number.isNaN(degrees)) {
      return;
    }

    this._rotationRadians = degToRad(degrees);
    this._updateStar();
  };

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
            <path
              d={this._calculatePath()}
              fill="transparent"
              ref={this._pathRef}
              stroke="blue"
            />
          </svg>
        </div>
        <div
          style={{
            backgroundColor: '#F0F0F0',
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            width: '100%',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              padding: '0 8px',
            }}>
            <div style={{ margin: '12px 0' }}>
              <div style={{ marginBottom: '4px' }}>
                <label>{'Rotation (degrees):'}</label>
              </div>
              <div>
                <input
                  defaultValue="0"
                  onChange={this._onChangeRotation}
                  style={{
                    borderRadius: '4px',
                    border: 'solid #AAA 1px',
                    padding: '2px',
                    width: '40px',
                  }}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              padding: '0 8px',
            }}
          />
        </div>
      </div>
    );
  }

  _calculatePath(): string {
    const points = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const angles = points.map(
      i => (i * Math.PI * 2) / 9 + this._rotationRadians,
    );
    const midAngles = points.map(
      i => (Math.PI / 9) * (2 * i + 1) + this._rotationRadians,
    );

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

  _updateStar(): void {
    this._pathRef.current.setAttribute('d', this._calculatePath());
  }
}

function radToDeg(rad: number): number {
  return (rad / Math.PI) * 180;
}

function degToRad(deg: number): number {
  return (deg / 180) * Math.PI;
}
