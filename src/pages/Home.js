import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import request from '../request';

export function Home() {
    const authCtx = useContext(AuthContext);
    const [{ viewId, title, text }, setState] = useState({
        viewId: 0,
        title: "",
        text: "",
    });

    const onChange = (e) => {
        let newState = { viewId, title, text };
        setState({
            ...newState,
            [e.target.name]: e.target.value
        });
    }

    const view = async (e) => {
        try {
            const res = await request.postView(viewId);

            setState({
                viewId,
                title: res.data.title,
                text: res.data.text,
            });
        }
        catch(e) {
            alert(e);
            console.log(e);
        }
    };
    const create = async (e) => {
        try {
            console.log(authCtx.tokens.accessToken);
            const res = await request.postCreate({ title, text });
            console.log(res);
        }
        catch(e) {
            alert(e);
            console.log(e);
        }
    };

    return (
        <div>
            <h2>Welcome home, {authCtx.login}</h2>
            <Link to="/registration">To Registration</Link>
            <Link to="/login">To Login</Link>
            <h2>View</h2>
            <input name="viewId" placeholder="View ID" value={viewId} onChange={onChange}/>
            <input name="title" placeholder="Title" value={title} onChange={onChange}/>
            <input name="text" placeholder="Text" value={text} onChange={onChange}/>
            <button onClick={view}>View</button>
            <button onClick={create}>Post</button>
        </div>
    );
}
