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
          <div style={{width: '100%', height:'100%', position: 'relative'}}>
              {tables && Object.keys(tables).map((tableName, idx) => (
                <Table name={tableName} idx={idx} key={idx} ref={tableName}/>
              ))}
            <canvas
            style={{
              width: '100%',
              height: '100%'
            }}>
            </canvas>
          </div>
        </Panel>
    );
  }

  renderAssociationLines = () => {
    const result = [];
    const { tables } = this.props;

    console.log('rendering association lines');
    for (let table in tables) {
      for (let association_num in tables[table].associations) {
        console.log("association num")
        const associatedTableName = tables[table].associations[association_num].Target;
        console.log("associated table name: ", associatedTableName);
        const fromCoords = tables[table].coords;
        if (fromCoords) {
          let fromX = (fromCoords.left + fromCoords.right) / 2;
          let fromY = (fromCoords.bottom + fromCoords.top) / 2;

          fromX = fromX;
          fromY = fromY;
          console.log('LINE FROM: ', fromX, fromY);

          const toCoords = tables[associatedTableName] && tables[associatedTableName].coords;
          if (toCoords) {
            let toX = (toCoords.left + toCoords.right) / 2;
            let toY = (toCoords.bottom + toCoords.top) / 2;


            result.push(
              <Line className="line" from={{x: fromX, y: fromY}} to={{x: toX, y: toY}} style="5px solid lightblue"/>
            );
          }
        }
      }
    }

    return result;
  }
}

export default Canvas;
