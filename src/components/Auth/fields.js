import { TextField } from '@mui/material';


export const AuthTextField = (props) => 
    <TextField
        variant='outlined'
        fullWidth
        {...props}
    />;

export const AuthImageInput = (props) =>
    <input
        type='file'
        accept='image/*'
        {...props}
    />;
