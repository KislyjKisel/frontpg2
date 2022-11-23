import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { useState } from 'react';

export function Login(props) {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();
    const [state, setState] = useState({
        login: "",
        password: "",
    });

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // funny
        try {
            const res = await appCtx.axios({
                method: 'POST',
                url: 'http://localhost:12345/api/auth/login',
                data: {
                    login: state.login,
                    password: state.password,
                }
            });
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
            <form onSubmit={onSubmit}>
                <input
                    name="login"
                    type="text"
                    placeholder="Login"
                    value={state.login}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={onChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}