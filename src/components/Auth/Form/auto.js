import { useMemo, useState } from 'react';

import AuthForm from '.';
import AuthTextField from '../TextField';


export const FieldKind = {
    Text: 1,
};

function createAutoAuthForm(fields, initialFormState) {
    return ({
        header,
        alternativePath,
        alternativeText,
        submitLabel,
        onSubmit,
    }) => {
        const [formState, setFormState] = useState(initialFormState);

        const handleChange = (e) => {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value,
            })
        };

        return (
            <AuthForm
                header={header}
                alternativePath={alternativePath}
                alternativeText={alternativeText}
                submitLabel={submitLabel}
                onSubmit={e => onSubmit(formState, e)}
            >
                {fields.map((field, fieldIdx) => {
                    switch(field.kind) {
                        case FieldKind.Text:
                            return (
                                <AuthTextField
                                    key={`field-${fieldIdx}`}
                                    required
                                    name={field.name}
                                    label={field.label}
                                    value={formState[field.name]}
                                    type={field.type}
                                    onChange={handleChange}
                                />
                            );
                    }
                })}
            </AuthForm>
        );
    };
}

export function useAutoAuthForm(stringifiedFields) {
    return useMemo(() => {
        const fields = JSON.parse(stringifiedFields);
        let initialFormState = {};
        fields.forEach(field => {
            switch(field.kind) {
                case FieldKind.Text:
                    initialFormState[field.name] = "";
                    break;
            }
        });
        return createAutoAuthForm(fields, initialFormState);
    }, [stringifiedFields]);
}