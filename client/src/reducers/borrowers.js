export const borrowersLogsData = (borrowers = [], action) => {
  switch (action.type) {
    case 'FETCH_BORROWERS_LOGS':
      return (borrowers = action.payload);
    default:
      return borrowers;
  }
};

export const itemLogDetails = (details = [], action) => {
  switch (action.type) {
    case 'GET_LOG_DETAILS':
      return (details = action.payload);
    case 'LOG_UPDATED':
      return (details = {
        ...details,
        receivedBy: action.payload.received_by,
        borrowerSignatureReturned: action.payload.borrowers_signature_returned,
        status: action.payload.item_status,
      });
    case 'CLEAR_ITEM_DETAILS':
      return (details = []);
    default:
      return details;
  }
};
