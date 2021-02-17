import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from './Login';

test('render Login page', () => {
    const params: Record<string, string> = {
        email: 'test@example.com',
        password: 'secret',
    };
    const handleSignIn = jest.fn();

    render(<Login signIn={handleSignIn} />);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByTestId('signin');

    // ログインフォームが表示されている
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    // ログイン処理が実行される
    fireEvent.change(email, { target: { value: params.email } });
    fireEvent.change(password, { target: { value: params.password } });
    fireEvent.click(submit);
    expect(handleSignIn).toHaveBeenCalledTimes(1);
});
