export const borrowersLogsData = (borrowers = [], action) => {
  switch (action.type) {
    case 'FETCH_BORROWERS_LOGS':
      return (borrowers = action.payload);
    case 'ADD_NEW_LOG':
      return (borrowers = [...borrowers, action.payload]);
    default:
      return borrowers;
  }
};

export const itemLogDetails = (details = [], action) => {
  switch (action.type) {
    case 'GET_LOG_DETAILS':
      return (details = action.payload);
    case 'CLEAR_ITEM_DETAILS':
      return (details = []);
    default:
      return details;
  }
};
