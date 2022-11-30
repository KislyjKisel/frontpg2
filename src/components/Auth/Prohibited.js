import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { AuthContext } from './Context';


export function AuthProhibited() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(authCtx.isUserLoggedIn) {
            navigate(location.state?.from?.pathname ?? '/');
            return;
        }
    }, [authCtx.isUserLoggedIn, location, navigate]);

    return <Outlet/>;
}
