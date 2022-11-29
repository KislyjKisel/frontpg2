import { useNavigate, Link as RLink } from "react-router-dom";
import { useState } from 'react';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import request from '../request';


export function Registration(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        login: "",
        password: "",
        firstName: "",
        lastName: "",
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
            const res = await request.register({
                login: state.login,
                password: state.password,
                firstName: state.firstName,
                lastName: state.lastName,
            });
            if(res.status === 201) {
                window.localStorage.setItem("tokens", JSON.stringify({
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                }));
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
                    Register
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
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        value={state.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        value={state.lastName}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        Register
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
                            to="/login"
                            variant="body2"
                        >
                            Already have an account? Login
                        </Link>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
}
