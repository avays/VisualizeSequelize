export const ADD_TABLE = 'ADD_TABLE';
export const UPDATE_TABLE = 'UPDATE_TABLE';

export const addTable = (name) => {
  return {
    type: ADD_TABLE,
    payload: name
  };
};
