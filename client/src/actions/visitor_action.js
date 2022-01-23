import * as api from '../api';

//Action Creators

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
