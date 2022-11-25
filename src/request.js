import axios from 'axios';

const API_BASE_URL = 'http://localhost:12345/api/';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
});

function authHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem('tokens').accessToken}`,
    };
};



function login({ login, password }) {
    return axiosInstance.post('auth/login', { login, password });
}

function register({ login, password, firstName, lastName }) {
    return axiosInstance.post('auth/register', { login, password, firstName, lastName });
}

function refresh() {
    return axiosInstance.post(
        'auth/refresh',
        {
            refreshToken: localStorage.getItem('tokens').refreshToken
        }
    );
}

function user() {
    return axiosInstance.get('user', { headers: authHeaders() });
}

function postCreate({ title, text }) {
    return axiosInstance.post('post/create', { title, text }, { headers: authHeaders() });
}

function postView(id) {
    return axiosInstance.get(`post/view?id=${id}`);
}

export default {
    login,
    register,
    refresh,
    user,
    postCreate,
    postView,
};
