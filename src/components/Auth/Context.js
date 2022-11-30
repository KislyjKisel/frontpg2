import React, { useState } from 'react';


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
