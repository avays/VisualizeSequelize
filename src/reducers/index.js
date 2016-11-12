import { combineReducers } from 'redux';

import tables from './tables';
import modal from './modal';
import newTableCoords from './newTableCoords';

export default combineReducers({
  tables,
  modal,
  newTableCoords
});
