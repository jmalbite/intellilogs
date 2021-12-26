import { combineReducers } from 'redux';

import { visitorsLogsData } from './visitors.js';
import { borrowersLogsData, itemLogDetails } from './borrowers.js';

import {
  user_signature,
  isErrorSaving,
  internalOrOutsider,
} from './global_reducer';

export default combineReducers({
  visitorsLogsData,
  user_signature,
  isErrorSaving,
  internalOrOutsider,
  borrowersLogsData,
  itemLogDetails,
});
