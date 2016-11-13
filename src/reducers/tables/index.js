import _ from 'lodash';

import { ADD_TABLE,
         TABLE_DRAG
       } from './actions';

const initialState = {};

import ReactDOM from 'react-dom';

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_TABLE:
      return {...state, ...payload};
  case TABLE_DRAG:
    return {...state, [payload.tablename]: {...state[payload.tablename], coords: ReactDOM.findDOMNode(payload.ref).getBoundingClientRect()}};
    default:
      return state;
  }
};
