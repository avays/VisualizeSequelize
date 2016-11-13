import React, { Component } from 'react';
import _ from 'lodash';
import Table from '../Table/TableContainer';
import { DropTarget } from 'react-dnd';
import { showModal } from '../reducers/modal/actions';
import { setNewTableCoords } from '../reducers/newTableCoords/actions';
import store from '../store';

const canvasTarget = {
  drop: (props, monitor) => {
    const coords = monitor.getClientOffset();
    store.dispatch(showModal());
    store.dispatch(setNewTableCoords(coords));
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
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
        {tables && Object.keys(tables).map((tableName, idx) => (
          <Table name={tableName} idx={idx} />
        ))}
      </div>
    );
  }
}

export default Canvas;
