export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = (table, tablename) => {
  return {
    type: SHOW_MODAL,
    payload: {
      table,
      tablename
    }
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
    payload: null
  };
};
