import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react';

import request from '../request';


const unauthenticatedState = { isUserLoggedIn: false, userInfo: null };

export const AuthContext = React.createContext(unauthenticatedState);

export function AuthProvider(props) {
    let [{ isUserLoggedIn, userInfo }, setState] = useState(unauthenticatedState);

    const updateUserInfo = (newUserInfo) => {
        setState({
            isUserLoggedIn: true,
            userInfo: newUserInfo,
        });
    };

    const logout = () => {
        setState(unauthenticatedState);
    };

    return (
        <AuthContext.Provider value={{
            isUserLoggedIn,
            userInfo,
            updateUserInfo,
            logout,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

const AUTH_REQUIRED_RESPONSE_STATUSES = [
    StatusCodes.CONFLICT,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.BAD_REQUEST
];

export function OnlyUnauthenticated(props) {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(authCtx.isUserLoggedIn) {
            navigate(props.redirect);
            return;
        }
    }, [authCtx.isUserLoggedIn]);

    return props.children;
}

export function AuthRequired(props) {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => { (async () => {
        if(authCtx.isUserLoggedIn) return;

        if(!localStorage.getItem('tokens')) {
            navigate(props.redirect);
            return;
        }

        try {
            const res = await request.user();
            if(res.status !== StatusCodes.OK) {
                throw new Error('Unknown response status: ' + res.statusText);
            }
            authCtx.updateUserInfo(res.data);
        }
        catch(e) {
            if(!(e instanceof AxiosError)) {
                throw e;
            }
            if(!AUTH_REQUIRED_RESPONSE_STATUSES.includes(e.response?.status)) {
                throw e;
            }
            navigate(props.redirect);
        }
    })(); }, [authCtx.isUserLoggedIn]);

    if(authCtx.isUserLoggedIn) {
        return props.children;
    }
    else {
        return 'Wait';
    }
}
