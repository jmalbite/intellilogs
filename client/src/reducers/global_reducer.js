export const user_signature = (signature = '', action) => {
  switch (action.type) {
    case 'USER_SIGNED':
      return (signature = action.payload);
    case 'CLEAR_SIGNATURE':
      return (signature = '');
    default:
      return signature;
  }
};

export const internalOrOutsider = (answer = '', action) => {
  switch (action.type) {
    case 'INTERNAL_OR_OUTSIDER':
      return (answer = action.payload);
    case 'CLEAR_QUESTIONAIRE_STATUS':
      return (answer = '');
    default:
      return answer;
  }
};

export const isErrorSaving = (error = null, action) => {
  switch (action.type) {
    case 'ERROR_SAVING':
      return (error = true);
    case 'ERROR_UPDATING':
      return (error = true);
    case 'ADD_NEW_LOG':
      return (error = false);
    case 'LOG_UPDATED':
      return (error = false);
    case 'CLEAR_ERROR':
      return (error = null);
    default:
      return error;
  }
};
