export const visitorsLogsData = (visitor = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_VISITOR_LOG':
      return action.payload;
    default:
      return visitor;
  }
};
