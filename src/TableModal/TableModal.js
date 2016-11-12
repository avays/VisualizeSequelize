import React, { Component } from 'react';
import { Modal, FormGroup, Form, ControlLabel, Col, FormControl } from 'react-bootstrap';
import _ from 'lodash';

class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fields: {},
      methods: {},
      associations: {}
    };
  }

  render() {
    const { modal } = this.props;
    const showModal = modal.show;

    return (
      <Modal show={showModal}>
        <Modal.Header>
          <h1>Model:</h1><input onInput={this.setName} placeholder="Input model name" />
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="field-field">
              <Col sm={12}>
                Fields
              </Col>
              <Col sm={2}>
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="placeholder" />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
              onClick={this.submitBtn}
          >Create Model</button>
        </Modal.Footer>
      </Modal>
    );
  }

  setName = (evt) => {
    this.setState( {name: evt.target.value, error: "" });
  }

  submitBtn = () => {
    this.props.createTable({
      [this.state.name]: {}
    });
    this.props.closeModal();
  }
}

export default TableModal;
