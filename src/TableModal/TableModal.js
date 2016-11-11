import React, { Component } from 'react';
import { Modal, Grid, Row, Col } from 'react-bootstrap';

class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fields: [], // array of field names
      fieldProps: {}, // keys are field names, values are arrays containing key/value pair of prop name and prop value
      addingField: false,
      currentFieldInput: ""
    };

    this.nameInput = this.nameInput.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
    this.addFieldBtn = this.addFieldBtn.bind(this);
    this.blurFieldInput = this.blurFieldInput.bind(this);
    this.addFieldInput = this.addFieldInput.bind(this);
  }

  render() {
    const { modal } = this.props;
    const showModal = modal.show;

    return (
      <Modal show={showModal}>
        <Modal.Header>
          <h1>Model:</h1>
          <input onInput={this.nameInput}></input>
        </Modal.Header>
        <Modal.Body>
          <Grid>
            <Row>
              <h3>Fields:</h3>
            </Row>
            {this.state.fields.map((fieldName, keyIdx) => (
              <Row key={keyIdx}>
                <h4>{fieldName}</h4>
              </Row>
            ))}
            <Row>
              {this.state.addingField ?
              <input
              onInput={this.addFieldInput}
              onBlur={this.blurFieldInput}
              ></input>
              : null }
            </Row>
            <Row>
              <button onClick={this.addFieldBtn}>Add Field</button>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.submitBtn}>Create Model</button>
        </Modal.Footer>
      </Modal>
    );
  }

  addFieldInput(evt) {
    this.setState({currentFieldInput: evt.target.value})
  }

  blurFieldInput() {
    this.setState({addingField: false});
    this.setState({fields: [...this.state.fields, this.state.currentFieldInput]});
    this.setState({currentFieldInput: ""});
  }

  nameInput(evt) {
    this.setState({ name: evt.target.value });
  }

  submitBtn() {
    this.props.createTable(this.state.name);
    this.props.closeModal();
  }

  addFieldBtn() {
    this.setState({addingField: true});
  }
}

export default TableModal;
