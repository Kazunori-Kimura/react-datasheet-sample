import { render, screen, fireEvent } from '@testing-library/react';
import { UserInfo } from '../../models/user';
import { Home } from './Home';

test('render Home page', () => {
    const user: UserInfo = {
        email: 'test@example.com',
    };
    const handleSignOut = jest.fn();

    render(<Home user={user} signOut={handleSignOut} />);

    // ログインユーザーのメールアドレスが表示されている
    const node = screen.getByText(new RegExp(user.email));
    expect(node).toBeInTheDocument();

    // SignOutボタンのクリックで signOut が呼ばれる
    const button = screen.getByTestId('signout');
    fireEvent.click(button);
    expect(handleSignOut).toHaveBeenCalledTimes(1);
});
