import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultColor, Point } from '../../models/solid';
import { UserInfo } from '../../models/user';
import { RootState } from '../../stores';
import { clearUserInfo } from '../../stores/user';
import PointTable from '../parts/PointTable';
//import SolidTable from '../parts/SolidTable';

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
    json: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.default,
    },
}));

interface HomeProps {
    user?: UserInfo;
    signOut?: VoidFunction;
}

// ランダムな数値を取得
const random = (): number => {
    return Math.floor(Math.random() * 1000) / 100;
};

export const Home: React.FC<HomeProps> = ({ user, signOut }) => {
    const [points, setPoints] = useState<Point[]>([]);

    const classes = useStyles();

    useEffect(() => {
        // 適当に Point を 100件生成
        const items: Point[] = [...Array(100)].map((_, index) => {
            const id = `p${index + 1}`;
            const name = `point${index + 1}`;

            return {
                id,
                name,
                x: random(),
                y: random(),
                z: random(),
                color: defaultColor,
            };
        });
        setPoints(items);
    }, []);

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
            <Grid container>
                <Grid item xs={6}>
                    <PointTable data={points} />
                </Grid>
                <Grid item xs={6}>
                    <pre className={classes.json}>{JSON.stringify(points, null, 4)}</pre>
                </Grid>
            </Grid>
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
