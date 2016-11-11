export const SET_NEW_TABLE_COORDS = 'SET_NEW_TABLE_COORDS';

export const setNewTableCoords = (coords) => {
  return {
    type: SET_NEW_TABLE_COORDS,
    payload: coords
  };
};
