export const ADD_TABLE = 'ADD_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';

export const addTable = (tableId, name) => {
  return {
    type: ADD_TABLE,
    payload: {
      tableId,
      name
    }
  };
};

export const removeTable = (tableId, name) => {
  return {
    type: REMOVE_TABLE,
    payload: tableId
  };
};
