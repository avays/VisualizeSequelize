import React, { Component } from 'react';
import _ from 'lodash';
import Table from '../Table/TableContainer';
import { showModal } from '../reducers/modal/actions';
import { setNewTableCoords } from '../reducers/newTableCoords/actions';
import store from '../store';

class Canvas extends Component {
  render() {
    const { tables } = this.props;

    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
        {tables && Object.keys(tables).map((tableName, idx) => (
          <Table name={tableName} idx={idx} key={idx}/>
        ))}
      </div>
    );
  }
}

export default Canvas;
