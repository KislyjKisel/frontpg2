import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { useNavigate, Link as RLink } from "react-router-dom";

import request from '../request';


export function Login(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        login: "",
        password: "",
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // funny
        try {
            const res = await request.login({ login: state.login, password: state.password });
            if(res.status === 200) {
                window.localStorage.setItem("tokens", JSON.stringify({
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                }));
                window.localStorage.setItem("login", state.login);
                navigate('/'); // query param - comeback link
            }
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
                        fullWidth
                        name="login"
                        type="text"
                        label="Login"
                        value={state.login}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        value={state.password}
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
