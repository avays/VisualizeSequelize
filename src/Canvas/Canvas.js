import React, { Component } from 'react';
import Table from '../Table/TableContainer';
import Grid from '../Grid/GridContainer';

export default class Canvas extends Component {
  render() {
    const { tables } = this.props;

    return (
        <div style={{
          width: '700px',
          height: '700px'
        }}>
        <Grid />
      </div>
    );
  }
}

/*
    tables.map(table => <Table name={table.name} key={table.name}/>)
*/
