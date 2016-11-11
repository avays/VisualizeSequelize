import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import store from '../store';
import { showModal } from '../reducers/modal/actions';
import { setNewTableCoords } from '../reducers/newTableCoords/actions';

const tileTarget = {
  drop: (props, monitor) => {
    const coords = monitor.getClientOffset();
    store.dispatch(showModal());
    store.dispatch(setNewTableCoords(coords))
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
};

@DropTarget(['TABLE_GLYPH'], tileTarget, collect)
class Tile extends Component {
  render() {
    const { connectDropTarget } = this.props;
 
    return connectDropTarget(
        <div style={{
          width: '100%',
          height: '100%'
        }}>
        {this.props.children}
      </div>
    );
  }
}

export default Tile;
