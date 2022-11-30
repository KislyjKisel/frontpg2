import { useNavigate } from "react-router-dom";

import requestAuth, { setTokens } from '../requests/auth';
import { FieldKind, useAutoAuthForm } from '../components/Auth/Form/auto';


const regFormFields = JSON.stringify([
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
    {
        kind: FieldKind.Text,
        name: 'firstName',
        label: 'First Name',
        required: true,
    },
    {
        kind: FieldKind.Text,
        name: 'lastName',
        label: 'Last Name',
        required: true,
    },
]);

export function Registration() {
    const navigate = useNavigate();
    const AutoAuthForm = useAutoAuthForm(regFormFields);

    const handleSubmit = async (regFormState, e) => {
        e.preventDefault();
        try {
            const { data: tokens } = await requestAuth.register({ ...regFormState });
            setTokens(tokens);
            navigate('/'); // query param - comeback link
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <AutoAuthForm
            header='Register'
            alternativePath='/login'
            alternativeText="Already have an account? Log in"
            submitLabel='OK'
            onSubmit={handleSubmit}
        />
    );
}
