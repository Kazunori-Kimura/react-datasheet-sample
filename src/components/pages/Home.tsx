import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfo } from '../../models/user';
import { RootState } from '../../stores';
import { clearUserInfo } from '../../stores/user';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(3),
    },
}));

interface HomeProps {
    user?: UserInfo;
    signOut?: VoidFunction;
}

export const Home: React.FC<HomeProps> = ({ user, signOut }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant="h1">Home</Typography>

            {user && <Typography variant="body1">{user.email}</Typography>}

            <Button variant="contained" color="primary" data-testid="signout" onClick={signOut}>
                Sign Out
            </Button>
        </Paper>
    );
};

const ConnectedHome: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const props: HomeProps = {
        user: user.current,
        signOut: () => dispatch(clearUserInfo()),
    };

    return <Home {...props} />;
};

export default ConnectedHome;
