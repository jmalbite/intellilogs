//checking user response from question component
export const InternalOrOutsider = (answer) => {
  return {
    type: 'INTERNAL_OR_OUTSIDER',
    payload: answer,
  };
};

//clearing state when closing the form
export const clearInOrOutState = () => {
  return {
    type: 'CLEAR_QUESTIONAIRE_STATUS',
  };
};

//storing user signature
export const user_signature = (signature) => {
  return {
    type: 'USER_SIGNED',
    payload: signature,
  };
};

//clear isErrorSaving state
export const clearErrorState = () => {
  return {
    type: 'CLEAR_ERROR',
  };
};

//clearing signature
export const clear_signature = () => {
  return {
    type: 'CLEAR_SIGNATURE',
  };
};
