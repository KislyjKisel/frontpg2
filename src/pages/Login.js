import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import request from '../request';

export function Login(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        login: "",
        password: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // funny
        try {
            const res = await request.login({ login: state.login, password: state.password });
            if(res.status === 200) {
                window.localStorage.setItem("tokens", JSON.stringify({
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                }));
                window.localStorage.setItem("login", state.login);
                navigate('/'); // query param - comeback link
            }
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <Link to="/registration">To Registration</Link>
            <form onSubmit={handleSubmit}>
                <input
                    name="login"
                    type="text"
                    placeholder="Login"
                    value={state.login}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
