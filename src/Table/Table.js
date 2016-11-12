import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
  }

  render() {
    const { fields, props, tableId } = this.props;

    return (
      <div>
      </div>
    );
  }

  addField() {
    this.props.createField(this.props.name);
  }

}

export default Table;
