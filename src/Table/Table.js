import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const tableSource = {
  beginDrag(props) {
    return { name: props.name };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) { return; }


  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Table extends Component {
  render() {
    const { table, fields, name } = this.props;
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div>
        {name}
        {
          table.fields.map(fieldId => fields[fieldId])
        }
      </div>
    )
  }
}

export default DragSource('TABLE', tableSource, collect)(Table);
