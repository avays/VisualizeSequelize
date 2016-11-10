import React, { Component } from 'react';
import Tile from '../Tile/Tile';

export default class Grid extends Component {
  render() {
    const { gridSize } = this.props;
    const tiles = [];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!tiles[i]) tiles[i] = [];
        tiles.push(this.renderTile([i,j]));
      }
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {tiles}
      </div>
    );
  }

  renderTile([i, j]) {
    const { gridSize } = this.props;

    const x = i % gridSize;
    const y = Math.floor(i / gridSize);

    const grid = `${100/gridSize}%`;

    return (
      <div
        style={{ width: grid, height: grid}}
        key={[i, j]}
        className="tile"
      >
        <Tile>
        </Tile>
      </div>
    );
  }
}
