import axios from 'axios';

const url = 'http://localhost:5000/visitorslogs';

export const fetchVisitorLogs = () => axios.get(url);
export const addVisitorLog = (newLog) => axios.post(newLog, url);
