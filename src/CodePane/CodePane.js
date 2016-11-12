import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import _ from 'lodash';

class CodePane extends Component {
  render() {
    const { tables } = this.props;

    return (
      <div>
        {Object.keys(tables).length ?
          <Tabs defaultActiveKey={0} id="code-tabs">
          {Object.keys(tables).map((tableName, idx) => (
                <Tab eventKey={idx} key={idx} title={tableName}>{this.renderTable(tables[tableName])}</Tab>
          ))}
         </Tabs> : null
        }
      </div>
    );
  }

  renderTable(table) {
    return (
      <div>
        {this.textWithNewlines(this.tableToCode(table))}
      </div>
    );
  }

  textWithNewlines(text) {
    return text.split('\n').map((item, idx) => (
      <span key={idx}>
        {item}
        <br />
      </span>
    ));
  }

  tableToCode(table) {
    let result = '';
    result += 'use strict;';
    result += '\n\n';
    result += `const ${_.capitalize(table)} = db.define('${_.camelCase(table)}'), {`
    result += '\n';
    result += '}, {';
    result += '\n';
    result += '});';
    result += '\n';
    result += `module.exports =${_.capitalize(table)};`;

    return result;
  }
}

export default CodePane;
