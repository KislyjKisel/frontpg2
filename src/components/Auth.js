import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext({ tokens: null });

export function Auth(props) {
    const navigate = useNavigate();
    let [{ tokens, login }, setState] = useState({
        tokens: {},
        login: '',
    });

    useEffect(() => {
        if(!tokens.access) {
            const oldTokensStr = window.localStorage.getItem('tokens');
            const oldLogin = window.localStorage.getItem('login');
            if(!oldTokensStr || !oldLogin) {
                console.log("not ", oldTokensStr, oldLogin);
                navigate('/login');
            }
            else {
                const oldTokens = JSON.parse(oldTokensStr);
                if(!oldTokens || !oldTokens.accessToken) {
                    navigate('/login');
                }
                else {
                    tokens = oldTokens;
                    login = oldLogin;
                    setState({ tokens, login });
                }
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ tokens, login }}>
            {props.children}
        </AuthContext.Provider>
    );
}
