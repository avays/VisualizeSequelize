import React, { Component } from 'react';
import { Tab, Tabs, Well } from 'react-bootstrap';
import _ from 'lodash';
import Highlight from 'react-highlight';

class CodePane extends Component {
  render() {
    const { tables } = this.props;

    return (
      <Well>
        {Object.keys(tables).length ?
          <Tabs defaultActiveKey={-1} id="code-tabs">
            <Tab eventKey={-1} title="index.js">{this.renderIndex()}</Tab>
            {Object.keys(tables).map((tableName, idx) => (
                  <Tab eventKey={idx} key={idx} title={`${_.camelCase(tableName)}.js`}>{this.renderTable(tables[tableName], tableName)}</Tab>
            ))}
            <Tab eventKey={Object.keys(tables).length} title={<button onClick={this.props.openModal}>+</button>}></Tab>
          </Tabs> :
          <Tabs defaultActiveKey={-1} id="code-tabs">
            <Tab eventKey={-1} title="index.js">{this.renderIndex()}</Tab>
            <Tab eventKey={Object.keys(tables).length} title={<button onClick={this.props.openModal}>+</button>}></Tab>
          </Tabs>
        }
      </Well>
    );
  }

  renderIndex = () => {
    const { tables } = this.props;
    let result = '';

    result += '\'use strict\';';
    result += '\n\n';

    for (let tablename in tables) {
      if({}.hasOwnProperty.call(tables, tablename)) {
        result += '\n';
        result += `const ${_.capitalize(_.camelCase(tablename))} = require('./${_.camelCase(tablename)}');`;
      }
    }

    result += '\n';
    result += '\n';

    for (let tablename in tables) {
        const table = tables[tablename];
        console.log('TABLE: ', table);
        for (let association_num in table.associations) {
            const association = table.associations[association_num];
            console.log('ASSOCIATION: ', association);
            if (association.Target !== '...' && association.Type != '...') {
              result += `${_.capitalize(_.camelCase(tablename))}.${_.camelCase(association.Type)}(${_.capitalize(_.camelCase(association.Target))});`;
              result += '\n';
            }
        }
    }
    result += '\n';
    result += 'module.exports = {';
    result += '\n';

    for (let tablename in tables) {
      if({}.hasOwnProperty.call(tables, tablename)) {
        result += `  ${_.capitalize(_.camelCase(tablename))},`;
        result += '\n';
      }
    }

    result += '};';

    return (
      <Highlight className="javascript">
        {result}
      </Highlight>
    );
  }

  renderTable(table, name) {
    return (
      <Highlight className="javascript">
        {this.tableToCode(table, name)}
      </Highlight>
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
    console.log('CODE_TABLE', table);
    let result = '';
    result += 'use strict;';
    result += '\n\n';
    result += `const ${_.capitalize(_.camelCase(name))} = db.define('${_.camelCase(name)}', {`
    result += '\n';
    for (let fieldKey in table.fields) {
      if({}.hasOwnProperty.call(table.fields, fieldKey)) {
        if(table.fields[fieldKey].Name !== '' && table.fields[fieldKey].Type !== '...') {
          result += `  ${table.fields[fieldKey].Name}: {`;
          result += '\n';
          result += `    type: Sequelize.${table.fields[fieldKey].Type.toUpperCase()}`
          result += '\n';
          result += '  }';
        }
      }
    }
    result += '\n';
    result += '}, {';

    result += '\n';
    result += '});';

    result += '\n';
    result += '\n';
    result += `module.exports = ${_.capitalize(_.camelCase(name))};`;

    return result;
  }
}

export default CodePane;
