import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';


const API_BASE_URL = 'http://localhost:12345/api/';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
});

const getTokens = () => JSON.parse(localStorage.getItem('tokens'));

function authHeaders() {
    return {
        Authorization: `Bearer ${getTokens().accessToken}`,
    };
};


const AUTH_REQUIRED_RESPONSE_STATUSES = [
    StatusCodes.CONFLICT,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.BAD_REQUEST
];

export function isAuthRequiredError(e) {
    return e instanceof AxiosError &&
        AUTH_REQUIRED_RESPONSE_STATUSES.includes(e.response?.status);
}


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
            refreshToken: getTokens().refreshToken
        }
    );
}

async function authenticatedRequestWithRefresh(method, url, data, headers = {}) {
    const cfg = {
        method,
        url,
        data,
        headers: {
            ...headers,
            ...authHeaders(),
        }
    };
    try {
        return await axiosInstance(cfg);
    }
    catch(reqErr) {
        if(reqErr instanceof AxiosError &&
            reqErr.response?.status === StatusCodes.UNAUTHORIZED &&
            reqErr.response.data === "Token expired"
        ) {
            try {
                const refreshRes = await refresh();
                localStorage.setItem('tokens', JSON.stringify(refreshRes.data));
                cfg.headers = {
                    ...cfg.headers,
                    ...authHeaders(),
                };
            }
            catch(refreshErr) {
                throw refreshErr;
            }
            return await axiosInstance(cfg);
        }
        throw reqErr;
    }
}

function user() {
    return axiosInstance.get('user', { headers: authHeaders() });
}

function postCreate({ title, text }) {
    return authenticatedRequestWithRefresh('POST', 'post/create', { title, text });
    // return axiosInstance.post('post/create', { title, text }, { headers: authHeaders() });
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
