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
