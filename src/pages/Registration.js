import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

import request from '../request';


export function Registration(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        login: "",
        password: "",
        firstName: "",
        lastName: "",
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
            const res = await request.register({
                login: state.login,
                password: state.password,
                firstName: state.firstName,
                lastName: state.lastName,
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
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={state.firstName}
                    onChange={handleChange}
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={state.lastName}
                    onChange={handleChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
