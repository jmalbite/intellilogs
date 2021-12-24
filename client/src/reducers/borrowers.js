export const borrowersLogsData = (borrowers = [], action) => {
  switch (action.type) {
    case 'FETCH_BORROWERS_LOGS':
      return (borrowers = action.payload);
    default:
      return borrowers;
  }
};
