import * as api from '../api';

//Action Creators

//storing visitorStatus
export const InternalOrOutsider = (answer) => {
  return {
    type: 'INTERNAL_OR_OUTSIDER',
    payload: answer,
  };
};

export const clearInOrOutState = () => {
  return {
    type: 'CLEAR_QUESTIONAIRE_STATUS',
  };
};

//storing signature in redux
export const user_signature = (signature) => {
  return {
    type: 'USER_SIGNED',
    payload: signature,
  };
};

//clear isErrorSaving state
export const clearErrorState = () => {
  return {
    type: 'CLEAR_ERROR',
  };
};

//clearing signature
export const clear_signature = () => {
  return {
    type: 'CLEAR_SIGNATURE',
  };
};

//storing newlog into database
export const storeNewLog = (newLog) => async (dispatch) => {
  try {
    //
    const { data } = await api.addVisitorLog(newLog);
    dispatch({ type: 'ADD_NEW_LOG', payload: data });
    //
  } catch (error) {
    //console log error
    console.log(error);
    dispatch({ type: 'ERROR_SAVING' });
  }
};

//getting visitor logs from database
export const getVisitorlogs = () => async (dispatch) => {
  try {
    //
    const { data } = await api.fetchVisitorLogs();
    dispatch({ type: 'FETCH_ALL_VISITOR_LOG', payload: data });
    //
  } catch (error) {
    console.log(error);
  }
};
