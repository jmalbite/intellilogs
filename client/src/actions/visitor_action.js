import * as api from '../api';

//Action Creators

//storing signature in redux
export const user_signature = (signature) => {
  return {
    type: 'USER_SIGNED',
    payload: signature,
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
