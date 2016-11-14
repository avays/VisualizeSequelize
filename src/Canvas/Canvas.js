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
            {this.renderAssociationLines()}
          </div>
        </Panel>
    );
  }

  renderAssociationLines = () => {
    const result = [];
    const { tables } = this.props;

    for (let table in tables) {
      for (let association_num in tables[table].associations) {
        const associatedTableName = tables[table].associations[association_num].Target;
        const associationType = tables[table].associations[association_num].Type;
        const lineStyle = (associationType === 'HasOne' || associationType === 'BelongsTo') ? 'solid' : 'dashed';
        const fromCoords = tables[table].coords;
        if (fromCoords) {
          let fromX = (fromCoords.left + fromCoords.right) / 2;
          let fromY = (fromCoords.bottom + fromCoords.top) / 2 - 50;

          const toCoords = tables[associatedTableName] && tables[associatedTableName].coords;
          if (toCoords) {
            let toX = (toCoords.left + toCoords.right) / 2;
            let toY = (toCoords.bottom + toCoords.top) / 2 - 50;

            const leftX = Math.min(fromX, toX);
            const rightX = Math.max(fromX, toX);
            const leftY = (leftX === fromX) ? fromY : toY;
            const rightY = (leftX === fromX) ? toY : fromY;
            const midX = (leftX + rightX) / 2;

            result.push(
              <div>
                {/* <Line className="line" from={{x: fromX, y: fromY}} to={{x: toX, y: toY}} style={`5px ${lineStyle} steelblue`}/> */}
                <Line className="line" from={{x: leftX, y: leftY}} to={{x: midX, y: leftY}} style={`5px ${lineStyle} steelblue`}/>
                <Line className="line" from={{x: rightX, y: rightY}} to={{x: midX, y: rightY}} style={`5px ${lineStyle} steelblue`}/>
                <Line className="line" from={{x: midX, y: leftY}} to={{x: midX, y: rightY}} style={`5px ${lineStyle} steelblue`}/>
              </div>
            );
          }
        }
      }
    }

    return result;
  }
}

export default Canvas;
