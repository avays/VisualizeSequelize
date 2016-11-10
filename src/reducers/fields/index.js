import { ADD_FIELD } from './actions';
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_FIELD:
      return [...state, payload];
    default:
      return state;
  }
};
