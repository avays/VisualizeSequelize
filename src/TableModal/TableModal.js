import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: "Model name cannot be empty."
    };
  }

  render() {
    const { modal } = this.props;
    const showModal = modal.show;

    return (
      <Modal show={showModal}>
        <Modal.Header>
          <h1>Model:</h1><input onInput={this.setName} placeholder="Input model name" />
          <br />
          <span style={{color: 'red'}}>
            {this.state.error}
          </span>
        </Modal.Header>
        <Modal.Body>
          <button
              onClick={this.submitBtn}
              disabled={this.state.error.length}
          >Create Model</button>
        </Modal.Body>
      </Modal>
    );
  }

  setName = (evt) => {
    const { tables } = this.props;

    if (!evt.target.value.length) {
      this.setState({ error: "Model name cannot be empty." });
    }
    else if (_.values(tables).includes(evt.target.value)) {
      this.setState({ error: "A model with this name already exists." });
    } else {
     this.setState( {name: evt.target.value, error: "" });
    }
  }

  submitBtn = () => {
    this.props.createTable({
      [this.state.name]: {}
    });
    this.props.closeModal();
  }
}

export default TableModal;
