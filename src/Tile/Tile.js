import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import store from '../store';
import { showModal } from '../reducers/modal/actions';

const tileTarget = {
  drop: (props, monitor) => {
    console.log(props);
    console.log(monitor);
    console.log(monitor.getItemType());
    store.dispatch(showModal());
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
};

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

export default DropTarget(['TABLE_GLYPH'], tileTarget, collect)(Tile);
