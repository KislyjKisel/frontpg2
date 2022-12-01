import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { AuthContext } from './Context';


export function AuthProhibited() {
    const { isUserLoggedIn } = useContext(AuthContext);
    const location = useLocation();

    if(isUserLoggedIn) {
        return <Navigate to={location.state?.from?.pathname ?? '/'}/>;
    }
    else {
        return <Outlet/>;
    }
}
