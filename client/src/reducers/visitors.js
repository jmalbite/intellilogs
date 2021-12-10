export const visitorsLogsData = (visitor = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_VISITOR_LOG':
      return action.payload;
    default:
      return visitor;
  }
};

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

export const isErrorSaving = (error = null, action) => {
  switch (action.type) {
    case 'ERROR_SAVING':
      return (error = true);
    case 'ADD_NEW_LOG':
      return (error = false);
    case 'CLEAR_ERROR':
      return (error = null);
    default:
      return error;
  }
};
