import { Link as RLink } from 'react-router-dom';
import { Box, Button, Container, Typography, Link } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import authFormStyles from './styles';


export default function AuthForm({
    onSubmit,
    header,
    alternativePath,
    alternativeText,
    children,
}) {
    return (
        <Container maxWidth="sm" sx={authFormStyles.container}>
            <Box sx={authFormStyles.outerBox}>
                <Typography component="h1" variant="h5">
                    {header}
                </Typography>
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={authFormStyles.form}
                >
                    {children}
                    <Button
                        variant='contained'
                        fullWidth
                        type='submit'
                    >
                        OK
                    </Button>
                </Box>
                <Grid2
                    container
                    sx={authFormStyles.alternativesGrid}
                >
                    <Grid2 item xsOffset={6} xs>
                        <Link
                            component={RLink}
                            to={alternativePath}
                            variant="body2"
                        >
                            {alternativeText}
                        </Link>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
}
