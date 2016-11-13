export const ADD_TABLE = 'ADD_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';
export const TABLE_DRAG = 'TABLE_DRAG';

export const addTable = (table) => {
  return {
    type: ADD_TABLE,
    payload: table
  };
};

export const tableDrag = (table, tablename, ref) => {
  return {
    type: TABLE_DRAG,
    payload: {
      table,
      tablename,
      ref
    }
  };
};
