import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';

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



  render() {
    const { tables, name } = this.props;
    console.log('tables', tables);
    console.log('name', name);
    console.log('testestesete', tables[name]);
    return (
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
    );
  }

  addField() {
    this.props.createField(this.props.name);
  }

}

export default Table;
