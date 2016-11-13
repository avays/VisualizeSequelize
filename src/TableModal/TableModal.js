import React, { Component } from 'react';
import { Modal, FormGroup, Form, ControlLabel, Col, FormControl, Panel, Grid } from 'react-bootstrap';
import _ from 'lodash';
import store from '../store';

class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fields: {1: {Type: '...'}},
      methods: {},
      associations: {1: {Type: '...', Target: '...'}}
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

  
  onAssociationSet = (associationName) => {
    /* console.log('targetid', fieldName.target.id);*/
    let number = associationName.target.id.split('_')[1];
    let type = associationName.target.id.split('_')[0];

    const associations = _.cloneDeep(this.state.associations);
    
    if (!associations[number]) { associations[number] = {}; }
    associations[number][type] = associationName.target.value;

    this.setState({associations: associations});
  }
  
  
  onFieldSet = (fieldName) => {
    /* console.log('targetid', fieldName.target.id);*/
    let number = fieldName.target.id.split('_')[1];
    let type = fieldName.target.id.split('_')[0];

    /* console.log('number', number);*/
    //console.log('type', type);

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
  
  createAssociations = () => {
    const result = [];
    let lastNum;
    for (let associationKey in this.state.associations) {
      lastNum = associationKey;
      result.push(this.genAssociations(this.state.associations[associationKey], associationKey));
    }
    
    console.log('num',lastNum);
    console.log('association',this.state.associations);
    if (this.state.associations[lastNum].Type && this.state.associations[lastNum].Type !== '...' && this.state.associations[lastNum].Name) {
      result.push(this.genAssociations({[lastNum + 1]: {}}, lastNum + 1));
    }
    return result;
  }

  createAssociationTargets = () => {
    //Let's get all Tables from State
    let Temptables = _.cloneDeep(store.getState().tables);
    
    //Add the current Table from State As a minimum.
    if(!Temptables[this.state.name]){Temptables[this.state.name] = {}}
    
    const result = [];
    for (let tableName in Temptables){
      result.push(<option value={tableName}>{tableName}</option>);
    }
    return result; 
  }

  genAssociations = (association,idx) => {
    
     const number = idx;
    return  (
    
        <FormGroup controlId="association-associationName" key={idx}>
            <Col sm={4}>
            <FormControl
                  onChange={this.onAssociationSet.bind(this)}
                  id={`Type_${number}`}
                  componentClass="select"
                  placeholder="type"
                  value={association.Type}
              >
                    <option value="...">Relationship</option>
                    <option value="BelongsTo">BelongsTo</option>
                    <option value="HasOne">HasOne</option>
                    <option value="BelongsToMany">BelongsToMany</option>
                    <option value="HasMany">HasMany</option>
            </FormControl>
            </Col>
            <Col sm={4}>
            <FormControl
                  onChange={this.onAssociationSet.bind(this)}
                  id={`Target_${number}`}
                  componentClass="select"
                  placeholder="type"
                  value={association.Target}
              >
                    {this.createAssociationTargets()}
            </FormControl>
            </Col>
            <Col sm={2}>
              <FormControl
                  onChange={this.onAssociationSet.bind(this)}
                  id={`Name_${number}`}
                  type="text"
                  placeholder="Alias"
                  value={association.Name || ""}
              />
            </Col>
        </FormGroup>)
      
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
              <Grid>
                 {this.createFields()}
              </Grid>
            </Form>
          </Panel>
                 
          <Panel header="Associations">
            <Form horizontal>
              {this.createAssociations()}
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
        fields: this.state.fields,
        associations: this.state.associations
      }
    });
    this.setState({
      name: "",
      fields: {1: {Type: '...'}},
      methods: {},
      associations: {1: {Type: '...', Target: '...'}}
    });
    this.props.closeModal();

  }
}

export default TableModal;
