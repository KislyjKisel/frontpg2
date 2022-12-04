import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import requestAuth, { setTokens } from '../requests/auth';
import AuthForm from '../components/Auth/Form/';
import { AuthTextField } from '../components/Auth/fields';


export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loginFormState, setLoginFormState] = useState({
        login: '',
        password: '',
    });

    const handleTextChange = (e) => {
        setLoginFormState({
            ...loginFormState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: tokens } = await requestAuth.login({ ...loginFormState });
            setTokens(tokens);
            navigate(location.state?.from?.pathname ?? '/');
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <AuthForm
            header='Log in'
            alternativePath='/register'
            alternativeText="Don't have an account? Register"
            onSubmit={handleSubmit}
        >
            <AuthTextField
                name='login'
                label='Username'
                required
                value={loginFormState.login}
                onChange={handleTextChange}
            />
            <AuthTextField
                name='password'
                label='Password'
                type='password'
                required
                value={loginFormState.password}
                onChange={handleTextChange}
            />
        </AuthForm>
    );
}
