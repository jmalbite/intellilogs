import axios from 'axios';

//const url = 'http://localhost:5000/visitorslogs';
const visitorURL = 'http://192.168.209.181:8080/api/visitorslogs';
const borrowersURL = 'http://192.168.209.181:8080/api/borrowerslogs';

//visitor logs
export const fetchVisitorLogs = () => axios.get(visitorURL);
export const addVisitorLog = (newLog) => axios.post(visitorURL, newLog);

//borrowers logs
export const fetchBorrowersLogs = () => axios.get(borrowersURL);
export const addBorrowersLog = (newLog) => axios.post(borrowersURL, newLog);
export const updateBorrowersLog = (borrowers_id, updateData) =>
  axios.put(`${borrowersURL}/${borrowers_id}`, updateData);
