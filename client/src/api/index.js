import axios from 'axios';

//const url = 'http://localhost:5000/visitorslogs';
const visitorURL = 'http://localhost:8080/api/visitorslogs';
const borrowersURL = 'https://localhost:8080/borrowerslogs';

//visitor logs
export const fetchVisitorLogs = () => axios.get(visitorURL);
export const addVisitorLog = (newLog) => axios.post(visitorURL, newLog);

//borrowers logs
