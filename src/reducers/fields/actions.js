export const ADD_FIELD = 'ADD_FIELD';
export const REMOVE_FIELD = 'REMOVE_FIELD';

export const addField = (tableId, fieldName, value) => {
  return {
    type: ADD_FIELD,
    payload: {
      tableId,
      fieldName,
      value
    }
  };
};
