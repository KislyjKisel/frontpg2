import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
});

export default axiosInstance;
