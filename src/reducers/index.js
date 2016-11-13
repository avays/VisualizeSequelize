import { combineReducers } from 'redux';

import tables from './tables';
import modal from './modal';

export default combineReducers({
  tables,
  modal
});
