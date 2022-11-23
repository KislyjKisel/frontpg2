import { useContext, useState } from 'react';
import { AppContext } from '../App'

export function User() {
    const appCtx = useContext(AppContext);
    const [{ login, firstName, lastName }, setState] = useState({});

    const onLoginChange = (e) => {
        setState({
            login: e.target.value,
            firstName, lastName,
        });
    };

    const onSubmit = async (e) => {
        try {
            const res = await appCtx.axios({
                method: 'GET',
                url: `http://localhost:12345/api/user?login=${login}`
            });
            setState({
                login,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
            })
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="login" placeholder="Login" value={login} onChange={onLoginChange}/>
                <button type="submit">
                    Lookup
                </button>
            </form>
            {firstName === undefined && lastName === undefined ? 'Loading...' : ''}
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
        </div>
    )
}