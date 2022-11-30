import { useLocation, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react';

import { getTokens, isAuthRequiredError } from '../requests/auth'
import requestUser from '../requests/user';


const unauthenticatedState = { isUserLoggedIn: false, userInfo: null };

export const AuthContext = React.createContext(unauthenticatedState);

export function AuthProvider(props) {
    let [{ isUserLoggedIn, userInfo }, setState] = useState(unauthenticatedState);

    const updateUserInfo = (newUserInfo) => {
        setState({
            isUserLoggedIn: !!newUserInfo,
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


const RequestWithReloginContext = React.createContext({});

const requestWithRelogin = (redirect, navigate, location, logout = undefined) => async (req) => {
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
        navigate(redirect, { state: { from: location } });
    }
};

export function useRequestWithRelogin() {
    const { logout } = useContext(AuthContext);
    const { redirect } = useContext(RequestWithReloginContext);
    const navigate = useNavigate();
    const location = useLocation();

    return requestWithRelogin(redirect, navigate, location, logout);
}

export function AuthRequired(props) {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => { (async () => {
        if(authCtx.isUserLoggedIn) return;

        if(!getTokens()) {
            navigate(props.redirect);
            return;
        }

        requestWithRelogin(props.redirect, navigate, location)(async () => {
            const res = await requestUser();
            authCtx.updateUserInfo(res.data);
        });
    })(); }, [authCtx.isUserLoggedIn]);

    if(authCtx.isUserLoggedIn) {
        return (
            <RequestWithReloginContext.Provider value={{ redirect: props.redirect }}>
                {props.children}
            </RequestWithReloginContext.Provider>
        );
    }
    else {
        return 'Wait';
    }
}
