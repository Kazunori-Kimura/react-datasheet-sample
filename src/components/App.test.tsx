import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createStore from '../stores';
import App from './App';

test('render App', async () => {
    const params: Record<string, string> = {
        email: 'test@example.com',
        password: 'secret',
    };

    const store = createStore();
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    // ログインフォームが表示されている
    const title = screen.getAllByText('Sign In');
    title.forEach((e) => {
        expect(e).toBeInTheDocument();
    });

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByTestId('signin');
    // ログイン処理
    fireEvent.change(email, { target: { value: params.email } });
    fireEvent.change(password, { target: { value: params.password } });
    fireEvent.click(submit);

    // Home に遷移
    await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});
