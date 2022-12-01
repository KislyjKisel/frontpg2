import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../components/Auth/Context';
import { useRequestWithRelogin } from '../components/Auth/Required';
import requestPost from '../requests/post';


export function Home() {
    const { userInfo } = useContext(AuthContext);
    const requestWithRelogin = useRequestWithRelogin();
    const [state, setState] = useState({
        viewId: 0,
        title: "",
        text: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const view = async (e) => {
        const res = await requestPost.view(state.viewId);

        setState({
            viewId: state.viewId,
            title: res.data.title,
            text: res.data.text,
        });
    };

    const create = async (e) => {
        await requestWithRelogin(() => requestPost.create({
            title: state.title,
            text: state.text,
        }));
    };

    return (
        <div>
            <h2>Welcome home, {userInfo.login}</h2>
            <Link to="/register">To Registration</Link>
            <Link to="/login">To Login</Link>
            <h2>View</h2>
            <input name="viewId" placeholder="View ID" value={state.viewId} onChange={handleChange}/>
            <input name="title" placeholder="Title" value={state.title} onChange={handleChange}/>
            <input name="text" placeholder="Text" value={state.text} onChange={handleChange}/>
            <button onClick={view}>View</button>
            <button onClick={create}>Post</button>
        </div>
    );
}
