import _ from 'lodash';

import { ADD_TABLE,
       } from './actions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_TABLE:
      return {...state, ...payload};
    default:
      return state;
  }
};
