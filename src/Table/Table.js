import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';
import Draggable from 'react-draggable';
import store from '../store';

class Table extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
  }

  renderTables = (tables,name) => {
    const result = [];

    for(let fieldKey in tables[name].fields){
      if({}.hasOwnProperty.call(tables[name].fields, fieldKey)) {
        if (tables[name].fields[fieldKey].Type !== '...' && tables[name].fields[fieldKey].Name !== '')
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
    }

    return result;
  }

  editTable = (tableEvt) => {
    const tablename = tableEvt.target.id;
    // find table
    const tables = store.getState().tables;

    this.props.showModal(tables[tablename], tablename);
  }

  onDrag = () => {
    this.props.onDrag(this.props.tables[this.props.name], this.props.name, this.refs['tableref']);
  }

  componentDidMount = () => {
    console.log("TABLE REFS: ", this.refs['tableref']);
    this.props.onDrag(this.props.tables[this.props.name], this.props.name, this.refs['tableref']);
  }

  render() {
    const { tables, name, idx } = this.props;

    return(
          <Draggable key={idx} onDrag={this.onDrag} ref="tableref">
              <div className="draggable-table">
                <Panel header={
                  <Grid>
                    <Col sm={9}>
                      <bold><h4>{name}</h4></bold>
                    </Col>
                    <Col sm={3}>
                      <Button id={name} bsStyle="info" onClick={this.editTable}> Edit</Button>
                    </Col>
                  </Grid>
                }>
                  <Grid>
                      <Row>
                        <Col sm={6}>
                          <strong>Name</strong>
                        </Col>
                        <Col sm={6}>
                          <strong>Type</strong>
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
