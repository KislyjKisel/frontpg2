import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react';

import request, { isAuthRequiredError } from '../request';


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


const AuthReqContext = React.createContext({});

const requestAuthenticated = (redirect, navigate, logout = undefined) => async (req) => {
    try {
        return await req()
    }
    catch(e) {
        if(!isAuthRequiredError(e)) {
            throw e;
        }
        if(logout) {
            logout();
            alert('Session expired, please re-login');
        }
        navigate(redirect);
    }
};

export function useRequestAuthenticated() {
    const { logout } = useContext(AuthContext);
    const { redirect } = useContext(AuthReqContext);
    const navigate = useNavigate();

    return requestAuthenticated(redirect, navigate, logout);
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

        requestAuthenticated(props.redirect, navigate)(async () => {
            const res = await request.user();
            authCtx.updateUserInfo(res.data);
        });
    })(); }, [authCtx.isUserLoggedIn]);

    if(authCtx.isUserLoggedIn) {
        return (
            <AuthReqContext.Provider value={{ redirect: props.redirect }}>
                {props.children}
            </AuthReqContext.Provider>
        );
    }
    else {
        return 'Wait';
    }
}
