import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { useState } from 'react';

export function Registration(props) {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();
    const [state, setState] = useState({
        login: "",
        password: "",
        firstName: "",
        lastName: "",
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
                url: 'http://localhost:12345/api/auth/register',
                data: {
                    login: state.login,
                    password: state.password,
                    firstName: state.firstName,
                    lastName: state.lastName,
                }
            });
            if(res.status === 201) {
                window.localStorage.setItem("tokens", JSON.stringify({
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                }));
                navigate('/'); // query param - comeback link
            }
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            <Link to="/login">To Login</Link>
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
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={state.firstName}
                    onChange={onChange}
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={state.lastName}
                    onChange={onChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
