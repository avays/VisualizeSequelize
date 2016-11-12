export const ADD_FIELD = 'ADD_FIELD';

export const addField = (tableId, name) => {
  return {
    type: ADD_FIELD,
    payload: {
      tableId,
      name
    }
  };
};
