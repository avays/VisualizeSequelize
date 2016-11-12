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
                <Tab eventKey={idx} key={idx} title={tableName}>{this.renderTable(tables[tableName], tableName)}</Tab>
          ))}
         </Tabs> : null
        }
      </div>
    );
  }

  renderTable(table, name) {
    return (
      <div>
        {this.textWithNewlines(this.tableToCode(table, name))}
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

  tableToCode(table, name) {
    let result = '';
    result += 'use strict;';
    result += '\n\n';
    result += `const ${_.capitalize(name)} = db.define('${_.camelCase(name)}'), {`
    result += '\n';
    result += '}, {';
    result += '\n';
    result += '});';
    result += '\n';
    result += `module.exports = ${_.capitalize(name)};`;

    return result;
  }
}

export default CodePane;
