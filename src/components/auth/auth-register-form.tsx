// import React, { useState } from 'react';
// import { AuthContext } from '../../context/authContext';
// import { useContext } from 'react';

// export default function AuthRegisterForm() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { register } = useContext(AuthContext);

//     function handleSubmit(event: any) {
//         console.log('on passe dans le submit')
//         event.preventDefault()

//         const data = {
//             surname: event.target.name.value,
//             email: event.target.email.value,
//             password: event.target.password.value
//         }

//         register(data)
//     }
//     return (
//         <main>
//             <h1>Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={event => setName(event.target.value)}
//                 />
//                 <br />
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={event => setEmail(event.target.value)}
//                 />
//                 <br />
//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={event => setPassword(event.target.value)}
//                 />
//                 <br />
//                 <button type="submit">Register</button>
//             </form>
//         </main>
//     );
// }

import React, { useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ButtonBase, IconButton } from '@mui/material';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const { register } = useContext(AuthContext);
    const [imageURL, setImageURL] = useState('');
    const [image, setImage] = useState('');

    const handleChangeImage = (event: any) => {
        setImageURL(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    }
    const handleChangeDeleteImage = (event: any) => {
        setImageURL('');
        setImage('');
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Envoyer l'image au serveur pour le traitement ici
        console.log(image);
        // ...


        const data = new FormData(event.currentTarget);
        const dataRegister = ({
            surname: data.get('surname'),
            email: data.get('email'),
            password: data.get('password'),
        });
        register(dataRegister);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="surname"
                                    label="surname"
                                    name="surname"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={4} >
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleChangeImage}
                                    hidden
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Avatar
                                    </Button>
                                </label>
                            </Grid>

                            {imageURL ?
                                <>
                                    <Grid item xs={2} justifySelf="flex-end" >
                                        <IconButton onClick={handleChangeDeleteImage}>
                                            <DeleteIcon style={{ color: ' #ef3c16 ' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={3} justifySelf="flex-end" >
                                        <Avatar alt="avatar" sx={{ bgcolor: "white" }} src={imageURL} />
                                    </Grid>

                                </>
                                : null
                            }
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}