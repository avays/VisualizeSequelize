import React, { Component } from 'react';
import _ from 'lodash';
import Table from '../Table/TableContainer';
import Line from '../Line/Line';
import ReactDOM from 'react-dom';
import { Panel } from 'react-bootstrap';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const tableCoords = {};

    for (let ref in this.refs) {
     tableCoords[ref] = ReactDOM.findDOMNode(this.refs[ref]).getBoundingClientRect();
    }
    console.log(tableCoords);
  }

  render() {
    const { tables } = this.props;


    return (
      <Panel
        className="canvas-panel"
        header="Database Models"
        style={{
              width: '100%',
              height: '100%',
              position: 'relative'
      }}>
        {tables && Object.keys(tables).map((tableName, idx) => (
          <Table name={tableName} idx={idx} key={idx} ref={tableName}/>
        ))}
        <Line from={{x:10, y:20}} to={{x:100, y:100}} style="5px solid orange"/>
      </Panel>
    );
  }
}

export default Canvas;
