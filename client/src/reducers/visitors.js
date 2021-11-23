export const visitors = (visitor = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_VISITOR_LOG':
      return visitor;
    case 'ADD_VISITOR_LOG':
      return visitor;
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
