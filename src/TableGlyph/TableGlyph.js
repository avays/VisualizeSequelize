import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
};

const tableGlyphSource = {
  beginDrag(props) {
    return {};
  },
  endDrag(props, monitor, component) {
    console.log('ending drag: ', props);
  }
};

class TableGlyph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showGlyph: true
    };
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div>
        Drag me?
      </div>
    );
  }
}

export default DragSource('TABLE_GLYPH', tableGlyphSource, collect)(TableGlyph);
