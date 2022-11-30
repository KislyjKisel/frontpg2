import { TextField } from '@mui/material';

export default function AuthTextField({
    required,
    name,
    label,
    type = undefined,
    value,
    onChange,
}) {
    return (
        <TextField
            variant="outlined"
            required={required}
            name={name}
            fullWidth
            label={label}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
}
