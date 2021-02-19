import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../stores/user';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        //
    },
    submit: {
        marginTop: theme.spacing(3),
    },
}));

interface LoginProps {
    signIn?: (email: string) => void;
}

interface LoginState {
    email: string;
    password: string;
}

export const Login: React.FC<LoginProps> = ({ signIn }) => {
    const [params, setParams] = useState<Partial<LoginState>>({
        email: 'test@example.com',
        password: 'secret',
    });
    const classes = useStyles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setParams({
            ...params,
            [name]: value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            if (signIn && params.email) {
                signIn(params.email);
            }
        }
    };

    return (
        <div className={classes.root}>
            <Container
                component="form"
                maxWidth="xs"
                className={classes.form}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h1">Sign In</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    id="email"
                    name="email"
                    value={params.email ?? ''}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={params.password ?? ''}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.submit}
                    data-testid="signin"
                >
                    Sign In
                </Button>
            </Container>
        </div>
    );
};

const ConnectedLogin: React.FC = () => {
    const dispatch = useDispatch();
    const props: LoginProps = {
        signIn: (email: string) => {
            dispatch(
                setUserInfo({
                    email,
                })
            );
        },
    };

    return <Login {...props} />;
};

export default ConnectedLogin;
