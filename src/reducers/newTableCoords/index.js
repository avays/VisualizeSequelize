import { SET_NEW_TABLE_COORDS } from './actions';

const initialState = {
  x: 0,
  y: 0
}

export default (state = initialState,  { type, payload }) => {
  switch(type) {
    case SET_NEW_TABLE_COORDS:
      return payload;
    default:
      return state;
  }
}
