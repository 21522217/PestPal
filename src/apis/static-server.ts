import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://pestpal-static-backend.onrender.com',
});

export default axiosClient;
