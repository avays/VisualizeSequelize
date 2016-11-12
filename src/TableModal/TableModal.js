import React, { Component } from 'react';
import { Modal, FormGroup, Form, ControlLabel, Col, FormControl, Panel } from 'react-bootstrap';
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
  
  onFieldSet = (fieldName) => {
    
    let number = fieldName.target.id.split('_')[1];
    let type = fieldName.target.id.split('_')[0];
    
    let oldState = this.state;
    
   // if(oldState.fields.number){
      oldState.fields.number.type = fieldName.target.text;
    //}else{
      
   // }
    
    
   // this.setState({fields: {...fields, })
  }

  genFields = (number) => {
       return  (<FormGroup controlId="field-fieldName">
            <Col sm={6}>
                  <FormControl onChange={this.onFieldSet.bind(this)} id={`Name_${number}`} type="text" placeholder="Fieldname" />
            </Col>
            <Col sm={4}>
                <FormControl onChange={this.onFieldSet.bind(this)}  id={`Type1_${number}`} componentClass="select" placeholder="type">
                    <option value="String">String</option>
                    <option value="Char">Char</option>
                    <option value="Integer">Integer</option>
                    <option value="BigInt">BigInt</option>
                    <option value="Float">Float</option>
                    <option value="Real">Real</option>
                    <option value="Double">Double</option>
                    <option value="Time">Time</option>
                    <option value="JSON">JSON</option>
                </FormControl>
            </Col>
        </FormGroup>)  
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
          <Panel header="Fields">
            <Form horizontal>
              {this.genFields(1)}
            </Form>
          </Panel>
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
