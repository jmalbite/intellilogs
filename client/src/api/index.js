import axios from 'axios';

//const url = 'http://localhost:5000/visitorslogs';
const url = 'http://localhost:8080/api/visitorslogs';

export const fetchVisitorLogs = () => axios.get(url);
export const addVisitorLog = (newLog) => axios.post(url, newLog);
