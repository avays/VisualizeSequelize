import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

class Table extends Component {
  render() {
    const { table, fields, name } = this.props;
    const { connectDragSource } = this.props;

    return (
      <div>
        {
          table.fields.map(fieldId => fields[fieldId])
        }
      </div>
    )
  }
}

export default Table;
