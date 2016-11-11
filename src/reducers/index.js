import { combineReducers } from 'redux';

import tables from './tables';
import fields from './fields';
import gridSize from './gridSize';
import modal from './modal';

export default combineReducers({
  tables,
  fields,
  gridSize,
  modal
});
