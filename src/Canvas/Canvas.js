import React, { Component } from 'react';
import Table from '../Table/TableContainer';
import Grid from '../Grid/GridContainer';
import { DropTarget } from 'react-dnd';
import { showModal } from '../reducers/modal/actions';
import { setNewTableCoords } from '../reducers/newTableCoords/actions';
import store from '../store';
import Draggable from 'react-draggable';

const canvasTarget = {
  drop: (props, monitor) => {
    const coords = monitor.getClientOffset();
    store.dispatch(showModal());
    store.dispatch(setNewTableCoords(coords));
    console.log('dropped in canvas');
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
};

@DropTarget(['TABLE_GLYPH'], canvasTarget, collect)
class Canvas extends Component {
  render() {
    const { tables } = this.props;
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div style={{
        width: '700px',
        height: '700px',
        backgroundColor: 'red'
      }}>
        {tables.map((table, tableIdx) => (
          <Draggable
              key={tableIdx}
              handle="strong"
          >
            <div>
              <strong><div>{table.name}</div></strong>
              <Table name={table.name} />
            </div>
          </Draggable>
        ))}
      </div>
    );
  }
}

export default Canvas;

/*
    tables.map(table => <Table name={table.name} key={table.name}/>)
*/
