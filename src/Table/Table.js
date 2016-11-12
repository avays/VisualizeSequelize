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
        {fields && fields[tableId].map(field => (
          <div>
            {Object.keys(field).map(fieldName => (
              <div>
                {fieldName}
                {field[fieldName].map(propId => (
                  <div>
                    {Object.keys(props[propId]).map(propName => (
                        <div>
                          {propName}:{props[propId][propName]}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  addField() {
    this.props.createField(this.props.name);
  }

}

export default Table;
