import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../components/Auth';
import request from '../request';


export function Home() {
    const { userInfo } = useContext(AuthContext);
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
        try {
            const res = await request.postView(state.viewId);

            setState({
                viewId: state.viewId,
                title: res.data.title,
                text: res.data.text,
            });
        }
        catch(e) {
            throw e;
        }
    };

    const create = async (e) => {
        try {
            const res = await request.postCreate({
                title: state.title,
                text: state.text,
            });
        }
        catch(e) {
            throw e;
        }
    };

    return (
        <div>
            <h2>Welcome home, {userInfo.login}</h2>
            <Link to="/registration">To Registration</Link>
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
