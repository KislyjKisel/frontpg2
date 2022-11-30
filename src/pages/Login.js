import { useNavigate } from "react-router-dom";

import requestAuth, { setTokens } from '../requests/auth';
import { FieldKind, useAutoAuthForm } from '../components/Auth/Form/auto';


const loginFormFields = JSON.stringify([
    {
        kind: FieldKind.Text,
        name: 'login',
        label: 'Username',
        required: true
    },
    {
        kind: FieldKind.Text,
        name: 'password',
        label: 'Password',
        required: true,
        type: 'password'
    },
]);

export function Login() {
    const navigate = useNavigate();
    const AutoAuthForm = useAutoAuthForm(loginFormFields);

    const handleSubmit = async (loginFormState, e) => {
        e.preventDefault();
        try {
            const { data: tokens } = await requestAuth.login({ ...loginFormState });
            setTokens(tokens);
            navigate('/'); // query param - comeback link
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <AutoAuthForm
            header='Log in'
            alternativePath='/register'
            alternativeText="Don't have an account? Register"
            submitLabel='OK'
            onSubmit={handleSubmit}
        />
    );
}
