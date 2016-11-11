import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import _ from 'lodash';

class CodePane extends Component {
  render() {
    const { tables } = this.props;

    return (
      <div>
        {tables.length ?
          <Tabs defaultActiveKey={0} id="code-tabs">
            {tables.map((table, idx) => {
              return (<Tab eventKey={idx} key={idx} title={table.name}>{this.renderTable(table)}</Tab>)
            })}
         </Tabs> : null
        }
      </div>
    );
  }

  renderTable(table) {
    return (
      <div>
        {this.tableToCode(table)}
      </div>
    );
  }

  tableToCode(table) {
    let result = [];
    result.push('\'use strict\'');
    result.push(<br />);
    result.push(`const ${_.capitalize(table.name)} = db.define('${_.camelCase(table.name)}'), {`);
    result.push(<br />);
    result.push('}, {');
    result.push(<br />);
    result.push('});');
    result.push(<br />);
    result.push(`module.exports = ${_.capitalize(table.name)};`);

    return result;
  }
}

export default CodePane;
