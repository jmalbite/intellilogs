const visitors = (visitor = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL_VISITOR_LOG':
      return visitor;
    case 'ADD_VISITOR_LOG':
      return visitor;
    default:
      return visitor;
  }
};

export default visitors;
