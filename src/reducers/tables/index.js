import _ from 'lodash';

import { ADD_TABLE,
         TABLE_DRAG
       } from './actions';

const initialState = {};

import ReactDOM from 'react-dom';

const getRelationshipInvert = (relationShip) => {
  switch(relationShip){
    case 'BelongsTo':
      return 'HasOne'
    case 'HasOne':
      return 'BelongsTo'
    case 'BelongsToMany':
      return 'HasMany'
    case 'HasMany':
      return 'BelongsToMany'
    default:
      return 'shit. - Go fix your dropdown'
  }
}


export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_TABLE:
      console.log('payload',payload);
      //Table is TableName
      //This whole logic will loop through associations and generate the inerse if it exists.
      for (let table in payload){
        for (let properties in payload[table]){
          if(properties == 'associations'){
            for(let association_number in payload[table][properties]){
               let tableToModify = _.cloneDeep(state[payload[table][properties][association_number].Target]);
               
               //Now lets loop through all the associations of the target table.
               //We are gonna check to see if there is an existing association with the above target
               //If there is we will modify it. If there is not we will add a new one.
               let does_Exist = false;
               let last_association = 0;
               
                if(tableToModify){
                 for(let association_number_Target in tableToModify.associations){
                    if(tableToModify.associations[association_number_Target].Target == table){
                      //We have a match. lets update and add to payload.
                      tableToModify.associations[association_number_Target].Type == getRelationshipInvert(payload[table][properties][association_number].Type);
                      console.log('Sweet it works!',tableToModify);
                      last_association = association_number_Target;
                      does_Exist = true;
                    }
                 }
                 
                 if(!does_Exist){
                    last_association++;
                    tableToModify.associations[last_association] = {Target: table, Type: getRelationshipInvert(payload[table][properties][association_number].Type)}
                 }
                 console.log('adding tablename to payload: ', payload[table][properties][association_number].Target);
                 payload = {...payload, [payload[table][properties][association_number].Target]: tableToModify};
                 
               }
            }
          }
        }
      }
      return {...state, ...payload};
  case TABLE_DRAG:
    return {...state, [payload.tablename]: {...state[payload.tablename], coords: ReactDOM.findDOMNode(payload.ref).getBoundingClientRect()}};
    default:
      return state;
  }
};
