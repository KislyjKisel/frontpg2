import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import request from '../request';


const unauthenticatedState = { isUserLoggedIn: false, userInfo: null };

export const AuthContext = React.createContext(unauthenticatedState);

const AUTH_REQUIRED_RESPONSE_STATUSES = [
    StatusCodes.CONFLICT,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.BAD_REQUEST
];

export function Auth(props) {
    const navigate = useNavigate();
    let [{ isUserLoggedIn, userInfo }, setState] = useState(unauthenticatedState);

    useEffect(() => { (async () => {
        if(isUserLoggedIn) return;

        if(!localStorage.getItem('tokens')) {
            if(props.required) {
                navigate('/login');
            }
            return;
        }

        try {
            const res = await request.user();
            if(res.status !== StatusCodes.OK) throw new Error('Unknown response status: ' + res.statusText);
            setState({ isUserLoggedIn: true, userInfo: res.data });
        }
        catch(e) {
            if(!(e instanceof AxiosError)) {
                throw e;
            }
            if(!AUTH_REQUIRED_RESPONSE_STATUSES.includes(e.response.status)) {
                throw e;
            }
            if(props.required) {
                navigate('/login');
            }
        }
    })(); }, []);

    if(isUserLoggedIn) {
        return (
            <AuthContext.Provider value={{ isUserLoggedIn, userInfo }}>
                {props.children}
            </AuthContext.Provider>
        );
    }
    else {
        return 'Wait';
    }
}
