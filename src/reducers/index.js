import { combineReducers } from 'redux';

import tables from './tables';
import fields from './fields';
import gridSize from './gridSize';

export default combineReducers({
  tables,
  fields,
  gridSize
});
