import _ from 'lodash';

import { ADD_TABLE,
         REMOVE_TABLE
       } from './actions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_TABLE:
      return {...state || {}, [payload.tableId]: payload.name};
    case REMOVE_TABLE:
      return _.omit(state, payload);
      // return _.omitBy(state, v => v === payload);
    default:
      return state;
  }
};
