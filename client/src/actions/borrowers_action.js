import * as api from '../api';

//action creators for borrowers log

//getting logs from database
export const getBorrowersLogs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBorrowersLogs();
    dispatch({ type: 'FETCH_BORROWERS_LOGS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

//adding logs into borrowers_logs table
export const storeBorrowersLog = (newLog) => async (dispatch) => {
  try {
    const { data } = await api.addBorrowersLog(newLog);
    dispatch({ type: 'ADD_NEW_LOG', payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'ERROR_SAVING' });
  }
};

//updating log when item is returned
export const updateLog = (borrowers_id, updatedData) => async (dispatch) => {
  try {
    const { data } = await api.updateBorrowersLog(borrowers_id, updatedData);
    dispatch({ type: 'LOG_UPDATED', payload: data });
  } catch (error) {
    dispatch({ type: 'ERROR_UPDATING' });
  }
};

export const getItemDetails = (itemDetails) => {
  return {
    type: 'GET_LOG_DETAILS',
    payload: itemDetails,
  };
};

export const clearItemDetails = () => {
  return {
    type: 'CLEAR_ITEM_DETAILS',
  };
};
