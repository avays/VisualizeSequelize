import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.nameInput = this.nameInput.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
  }

  render() {
    const { modal } = this.props;
    const showModal = modal.show;

    return (
      <Modal show={showModal}>
        <Modal.Body>
          <h4>test text</h4>
          <input onInput={this.nameInput}></input>
          <button onClick={this.submitBtn}>Submit</button>
        </Modal.Body>
      </Modal>
    );
  }

  nameInput(evt) {
    this.setState({ name: evt.target.value })
  }

  submitBtn() {
    this.props.createTable(this.state.name);
    this.props.closeModal();
  }
}

export default TableModal;
