import _ from 'lodash';
import { ADD_PROP } from './actions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
    switch(type) {
    case ADD_PROP:
      return {...state || {}, [payload.propId]: {[payload.name]: [payload.value]}};
  default:
    return state;
  }
}
