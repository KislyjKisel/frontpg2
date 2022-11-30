import { useNavigate, Link as RLink } from "react-router-dom";
import { useState } from 'react';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import requestAuth from '../requests/auth';


export function Registration(props) {
    const navigate = useNavigate();
    const [regFormState, setRegFormState] = useState({
        login: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const handleChange = (e) => {
        setRegFormState({
            ...regFormState,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: tokens } = await requestAuth.register({ ...regFormState });
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
                        value={regFormState.login}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        value={regFormState.password}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        value={regFormState.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        value={regFormState.lastName}
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
