import axios from 'axios';

//const url = 'http://localhost:5000/visitorslogs';
const visitorURL = 'http://localhost:8080/api/visitorslogs';
const borrowersURL = 'http://localhost:8080/api/borrowerslogs';

//visitor logs
export const fetchVisitorLogs = () => axios.get(visitorURL);
export const addVisitorLog = (newLog) => axios.post(visitorURL, newLog);

//borrowers logs
export const fetchBorrowersLogs = () => axios.get(borrowersURL);
export const addBorrowersLog = (newLog) => axios.post(borrowersURL, newLog);
