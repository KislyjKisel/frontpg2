import { useState } from 'react';
import { useNavigate, Link as RLink } from "react-router-dom";
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import requestAuth from '../requests/auth';


export function Login(props) {
    const navigate = useNavigate();
    const [loginFormState, setLoginFormState] = useState({
        login: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginFormState({
            ...loginFormState,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: tokens } = await requestAuth.login({ ...loginFormState });
            window.localStorage.setItem("tokens", JSON.stringify(tokens));
            navigate('/'); // query param - comeback link
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ alignItems: "center" }}>
            <Box
                sx={{
                    mt: 10,
                    ml: "auto",
                    mr: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "75%",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                    }}
                >
                    <TextField
                        variant="outlined"
                        required
                        name="login"
                        fullWidth
                        label="Login"
                        value={loginFormState.login}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        value={loginFormState.password}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        Login
                    </Button>
                </Box>
                <Grid2
                    container
                    spacing={0}
                    sx={{
                        mt: 1,
                        width: "100%",
                    }}
                >
                    <Grid2 item xsOffset={6} xs>
                        <Link
                            component={RLink}
                            to="/registration"
                            variant="body2"
                        >
                            Don't have an account? Register
                        </Link>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
}
