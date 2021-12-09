import { combineReducers } from 'redux';

import {
  visitorsLogsData,
  user_signature,
  isErrorSaving,
  internalOrOutsider,
} from './visitors.js';

export default combineReducers({
  visitorsLogsData,
  user_signature,
  isErrorSaving,
  internalOrOutsider,
});
