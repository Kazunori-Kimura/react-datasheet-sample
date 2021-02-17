import { useSelector } from 'react-redux';
import { UserInfo } from '../models/user';
import { RootState } from '../stores';
import Home from './pages/Home';
import Login from './pages/Login';

interface AppProps {
    user?: UserInfo;
}

export const App: React.FC<AppProps> = ({ user }) => {
    return <>{user ? <Home /> : <Login />}</>;
};

const ConnectedApp: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const props: AppProps = {
        user: user.current,
    };
    return <App {...props} />;
};

export default ConnectedApp;
