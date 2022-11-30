import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import request from './common';


const LSKEY_TOKENS = 'tokens';

export const getTokens = () => JSON.parse(localStorage.getItem(LSKEY_TOKENS));

export const setTokens = (tokens) => {
    localStorage.setItem(LSKEY_TOKENS, JSON.stringify(tokens));
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

function refresh() {
    return request.post(
        'auth/refresh',
        {
            refreshToken: getTokens().refreshToken
        }
    );
}

const requestAuth = {
    login: ({ login, password }) => {
        return request.post('auth/login', { login, password });
    },
    register: ({ login, password, firstName, lastName }) => {
        return request.post('auth/register', { login, password, firstName, lastName });
    },
};

export default requestAuth;


function authHeaders() {
    return {
        Authorization: `Bearer ${getTokens().accessToken}`,
    };
};

export async function authenticatedRequest(url, {
    method = 'GET',
    data = {},
    headers = {},
    canRefresh = true,
} = {}) {
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
        return await request(cfg);
    }
    catch(reqErr) {
        if(canRefresh &&
            reqErr instanceof AxiosError &&
            reqErr.response?.status === StatusCodes.UNAUTHORIZED &&
            reqErr.response.data === "Token expired"
        ) {
            try {
                const refreshRes = await refresh();
                localStorage.setItem(LSKEY_TOKENS, JSON.stringify(refreshRes.data));
                cfg.headers = {
                    ...cfg.headers,
                    ...authHeaders(),
                };
            }
            catch(refreshErr) {
                throw refreshErr;
            }
            return await request(cfg);
        }
        throw reqErr;
    }
}
