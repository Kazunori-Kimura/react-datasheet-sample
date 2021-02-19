import { Button, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { data } from '../../models/solid';
import { UserInfo } from '../../models/user';
import { RootState } from '../../stores';
import { clearUserInfo } from '../../stores/user';
import { SolidTable } from '../parts/SolidTable';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(3),
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    title: {
        flex: 1,
    },
    signOut: {
        marginLeft: theme.spacing(1),
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
            <header className={classes.header}>
                <Typography variant="h6" component="h1" className={classes.title}>
                    Home
                </Typography>

                {user && <Typography variant="body1">{user.email}</Typography>}

                <Button
                    className={classes.signOut}
                    variant="contained"
                    color="primary"
                    size="small"
                    data-testid="signout"
                    onClick={signOut}
                >
                    Sign Out
                </Button>
            </header>
            <Divider />
            {/* react-datasheetのテスト */}
            <SolidTable data={data} />
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
