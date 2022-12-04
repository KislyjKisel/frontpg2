import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Cropper from 'react-easy-crop';

import requestAuth, { setTokens } from '../../requests/auth';
import AuthForm from '../../components/Auth/Form';
import { AuthImageInput, AuthTextField } from '../../components/Auth/fields';
import { getCroppedAvatar } from '../../util/canvas';
import registrationPageStyles from './styles';


const AvatarSelectionDialog = ({ onClose, open }) => {
    const maxZoom = 10;

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('logo192.png');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleFileSelected = (e) => {
        if(e.target.files.length === 0) return;
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        if(image === null) return;
        const url = URL.createObjectURL(image);
        setImageUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    const handleOk = async () => {
        onClose(await getCroppedAvatar(imageUrl, croppedAreaPixels, rotation));
    };

    const handleCancel = () => {
        onClose();
    };

    const handleCropComplete = (newCroppedArea, newCroppedAreaPixels) => {
        setCroppedAreaPixels(newCroppedAreaPixels);
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle>
                Choose avatar
            </DialogTitle>
            <DialogContent dividers>
                <Box width='100%' display='flex' justifyContent='center'>
                    <Box sx={registrationPageStyles.cropperBox}>
                        {image ? (
                            <Cropper
                                image={imageUrl}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                maxZoom={maxZoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onZoomChange={setZoom}
                                onCropComplete={handleCropComplete}
                            />
                        ) : (null)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                        <Button
                            component='label'
                            variant='outlined'
                        >
                            <AuthImageInput
                                name='avatar'
                                hidden
                                onChange={handleFileSelected}
                            />
                            Browse
                        </Button>
                        <div style={{ flex: '1 0 0' }}/>
                        <Button
                            variant='contained'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleOk}
                        >
                            OK
                        </Button>
            </DialogActions>
        </Dialog>
    );
};

export function Registration() {
    const navigate = useNavigate();
    const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('logo192.png');
    const [regFormState, setRegFormState] = useState({
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        avatar: null,
    });

    const handleTextChange = (e) => {
        setRegFormState({
            ...regFormState,
            [e.target.name]: e.target.value
        });
    };

    const handleAvatarPreviewClick = () => setAvatarDialogOpen(true);

    const handleAvatarDialogClose = (avatarBlob) => {
        setAvatarDialogOpen(false);
        if(avatarBlob) {
            setRegFormState({
                ...regFormState,
                avatar: avatarBlob,
            });
            URL.revokeObjectURL(avatarUrl);
            setAvatarUrl(URL.createObjectURL(avatarBlob));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(regFormState);
            const { data: tokens } = await requestAuth.register({ ...regFormState });
            setTokens(tokens);
            navigate('/'); // query param - comeback link
        }
        catch(e) {
            console.error(e);
        }
    };

    return (
        <AuthForm
            header='Register'
            alternativePath='/login'
            alternativeText='Already have an account? Log in'
            submitLabel='OK'
            onSubmit={handleSubmit}
        >
            <Box
                component='img'
                src={avatarUrl}
                width={128}
                height={128}
                onClick={handleAvatarPreviewClick}
            />
            <AvatarSelectionDialog
                open={avatarDialogOpen}
                onClose={handleAvatarDialogClose}
            />
            <AuthTextField
                name='login'
                label='Username'
                required
                value={regFormState.login}
                onChange={handleTextChange}
            />
            <AuthTextField
                name='password'
                label='Password'
                type='password'
                required
                value={regFormState.password}
                onChange={handleTextChange}
            />
            <AuthTextField
                name='firstName'
                label='First Name'
                required
                value={regFormState.firstName}
                onChange={handleTextChange}
            />
            <AuthTextField
                name='lastName'
                label='Last Name'
                required
                value={regFormState.lastName}
                onChange={handleTextChange}
            />
        </AuthForm>
    );
}
