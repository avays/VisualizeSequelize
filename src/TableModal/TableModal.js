import React, { Component } from 'react';
import { Modal, FormGroup, Form, Col, FormControl, Panel } from 'react-bootstrap';
import _ from 'lodash';
import store from '../store';

class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fields: {1: {Type: '...'}},
      methods: {},
      associations: {}
    };
  }

  componentWillMount() {
    if(!this.state.name) {
      const modal = store.getState().modal;
      console.log('modal:', modal);
      modal && modal.tablename && this.setState({name: modal.tablename, fields: modal.table.fields })
    }
  }

  renderExtraInput = (field, number) => {
    switch(field.Type) {
      case "String":
      case "Char":
      case "Integer":
      case "BigInt":
        return (
          <Col sm={12}>
            <FormControl
            onChange={this.onFieldSet.bind(this)}
            id={`Lengths_${number}`}
            type="number"
            min="1"
            max="255"
            placeholder="Length Max"
            value={field.Length || "255"}
            />
          </Col>
        )
      case "Float":
      case "Real":
      case "Double":
      case "Decimal":
        return (
          <div>
            <Col sm={6}>
              <FormControl
              onChange={this.onFieldSet.bind(this)}
              id={`Length_${number}`}
              type="number"
              placeholder="Length"
              value={field.Length || ""}
              />
            </Col>
            <Col sm={6}>
              <FormControl
              onChange={this.onFieldSet.bind(this)}
              id={`Precision_${number}`}
              type="number"
              placeholder="Precision"
              value={field.Precision || ""}
              />
            </Col>
          </div>
        )

      default:
        break;
    }
  }

  onFieldSet = (fieldName) => {
    /* console.log('targetid', fieldName.target.id);*/
    let number = fieldName.target.id.split('_')[1];
    let type = fieldName.target.id.split('_')[0];

    /* console.log('number', number);*/
    console.log('type', type);

    const fields = _.cloneDeep(this.state.fields);
    if (!fields[number]) { fields[number] = {}; }
    fields[number][type] = fieldName.target.value;

    this.setState({fields: fields});
  }

  createFields = () => {
    const result = [];
    let lastNum;
    for (let fieldKey in this.state.fields) {
      if({}.hasOwnProperty.call(this.state.fields, fieldKey)) {
        lastNum = fieldKey;
        result.push(this.genFields(this.state.fields[fieldKey], fieldKey));
      }
    }
    if (this.state.fields[lastNum].Type && this.state.fields[lastNum].Type !== '...' && this.state.fields[lastNum].Name) {
      result.push(this.genFields({[lastNum + 1]: {}}, lastNum + 1));
    }
    return result;
  }

  genFields = (field, idx) => {
    /* console.log('field: ', field);
     * console.log('state: ', this.state);*/
    /* const number = Object.keys(field)[0];*/
    const number = idx;
    /* console.log('NUMBER(FIELD IDX): ', idx);*/
    /* console.log('NUMBER: ', number);*/
       return  (<FormGroup controlId="field-fieldName" key={idx}>
            <Col sm={3}>
              <FormControl
                  onChange={this.onFieldSet.bind(this)}
                  id={`Name_${number}`}
                  type="text"
                  placeholder="Fieldname"
                  value={field.Name || ""}
              />
            </Col>
            <Col sm={2}>
              <FormControl
                  onChange={this.onFieldSet.bind(this)}
                  id={`Type_${number}`}
                  componentClass="select"
                  placeholder="type"
                  value={field.Type}
              >
                    <option value="...">...</option>
                    <option value="String">String</option>
                    <option value="Char">Char</option>
                    <option value="Integer">Integer</option>
                    <option value="BigInt">BigInt</option>
                    <option value="Float">Float</option>
                    <option value="Real">Real</option>
                    <option value="Double">Double</option>
                    <option value="Time">Time</option>
                    <option value="JSON">JSON</option>
                    <option value="Text">Text</option>
                    <option value="Decimal">Decimal</option>
                    <option value="Boolean">Boolean</option>
                    <option value="Date">Date</option>
                    <option value="Date Only">Date Only</option>
                    <option value="Now">Now</option>
                    <option value="Blob">Blob</option>
                </FormControl>
            </Col>
            <Col sm={6}>
                {this.renderExtraInput(field, number)}
            </Col>
            <Col sm={1}>
            </Col>
        </FormGroup>)
  }

  render() {
    const { modal } = this.props;
    const showModal = modal.show;

    return (
      <Modal show={showModal}>
        <Modal.Header>
          <h1>Model:</h1><input onInput={this.setName} placeholder="Input model name" value={this.state.name}/>
        </Modal.Header>
        <Modal.Body>
          <Panel header="Fields">
            <Form horizontal>
              {this.createFields()}
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
    this.setState( {name: evt.target.value});
  }

  submitBtn = () => {
    this.props.createTable({
      [this.state.name]: {
        fields: this.state.fields
      }
    });
    this.setState({
      name: "",
      fields: {1: {Type: '...'}},
      methods: {},
      associations: {}
    });
    this.props.closeModal();

  }
}

export default TableModal;
