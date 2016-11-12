export const ADD_PROP = 'ADD_PROP';

export const addProp = (fieldId, name, value) => {
  return {
    type: ADD_PROP,
    payload: {
      fieldId,
      propId,
      name,
      value
    }
  };
};
