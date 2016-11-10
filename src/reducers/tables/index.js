import { ADD_TABLE, REMOVE_TABLE } from './actions';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_TABLE:
      return [...state, {name: payload, fields: []}];
    case REMOVE_TABLE:
      return state.filter(table => table.name !== payload);
    default:
      return state;
  }
}
