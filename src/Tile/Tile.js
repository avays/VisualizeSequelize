import React, { Component } from 'react';

export default class Tile extends Component {
  render() {
    return (
        <div style={{
          width: '100%',
          height: '100%'
        }}>
        {this.props.children}
      </div>
    );
  }
}
