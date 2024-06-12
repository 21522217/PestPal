import axios from 'axios';

const baseURL = 'http://172.20.87.234:8000/';

const client = axios.create({
  baseURL: baseURL,
});

export default client;