import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import request from '../request';


const unauthenticatedState = { isUserLoggedIn: false, userInfo: null };

export const AuthContext = React.createContext(unauthenticatedState);

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
            if(e.response.status !== StatusCodes.CONFLICT &&
                e.response.status !== StatusCodes.UNAUTHORIZED &&
                e.response.status !== StatusCodes.BAD_REQUEST) {
                throw e;
            }
            if(props.required) {
                navigate('/login');
            }
        }
    })(); }, []);

    return isUserLoggedIn ? (
        <AuthContext.Provider value={{ isUserLoggedIn, userInfo }}>
            {props.children}
        </AuthContext.Provider>
    ) : 'Wait';
}
