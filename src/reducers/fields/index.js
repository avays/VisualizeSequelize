import _ from 'lodash';

import { ADD_FIELD } from './actions';
import { REMOVE_TABLE } from '../tables/actions';
import { ADD_PROP } from '../props/actions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_FIELD:
      return {...state,
              [payload.tableId]: { name: payload.name,
                                        props: []
                                        }
            };
    case REMOVE_TABLE:
      return _.omit(state, tableId + '');
    case ADD_PROP:
      return {...state, [payload.fieldId]: [...state[payload.fieldId], payload.propId]};
    default:
      return state;
  }
};
