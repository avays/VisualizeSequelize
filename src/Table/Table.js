import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';
import Draggable from 'react-draggable';
import store from '../store';
import ResizableBox from 'react-resizable-component';

class Table extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
  }

  renderTables = (tables,name) => {
    const result = [];

    for(let fieldKey in tables[name].fields){
      result.push(
        <Row>
          <Col sm={6}>
            {tables[name].fields[fieldKey].Name}
          </Col>
          <Col sm={6}>
            {tables[name].fields[fieldKey].Type}
          </Col>
        </Row>
      )
    }

    return result;
  }

  editTable = (tableEvt) => {
    const tablename = tableEvt.target.id;
    // find table
    const tables = store.getState().tables;
    console.log('tablename in editTable', tablename);

    this.props.showModal(tables[tablename], tablename);
  }


  render() {
    const { tables, name, idx } = this.props;

    return(
          <Draggable key={idx}>
              <div className="draggable-table">
                <Panel header={
                  <Grid>
                    <Col sm={8}>
                      <bold>{name}</bold>
                    </Col>
                    <Col sm={4}>
                      <Button id={name} bsStyle="info" onClick={this.editTable}> Edit</Button>
                    </Col>
                  </Grid>
                }>
                  <Grid>
                      <Row>
                        <Col sm={6}>
                          <div>Name</div>
                        </Col>
                        <Col sm={6}>
                          <div>Type</div>
                        </Col>
                      </Row>
                    { this.renderTables(tables,name) }
                  </Grid>
                </Panel>
              </div>
          </Draggable>
      );
  }


  addField() {
    this.props.createField(this.props.name);
  }

}

export default Table;
