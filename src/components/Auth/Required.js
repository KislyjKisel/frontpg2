import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { getTokens, isAuthRequiredError } from '../../requests/auth';
import requestUser from '../../requests/user';
import { AuthContext } from './Context';


const RequestWithReloginContext = React.createContext({});

const requestWithRelogin = (
    redirect,
    navigate,
    location,
    logout = undefined
) => async (req) => {
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
    })(); }, [authCtx.isUserLoggedIn, authCtx, location, navigate, props.redirect]);

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

export function useRequestWithRelogin() {
    const { logout } = useContext(AuthContext);
    const { redirect } = useContext(RequestWithReloginContext);
    const navigate = useNavigate();
    const location = useLocation();

    return requestWithRelogin(redirect, navigate, location, logout);
}
