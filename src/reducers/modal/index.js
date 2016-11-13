import { SHOW_MODAL, HIDE_MODAL } from './actions';
const initialState = { show: false, table: {} };

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case SHOW_MODAL:
    return {...state, show: true, ...payload };
    case HIDE_MODAL:
      return {...state, show: false};
    default:
      return state;
  }
}
