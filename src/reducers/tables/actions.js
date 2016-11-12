export const ADD_TABLE = 'ADD_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';

export const addTable = (table) => {
  return {
    type: ADD_TABLE,
    payload: table
  };
};
