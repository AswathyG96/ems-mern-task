import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

// Mocking axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { token: { username: 'testUser', accessToken: 'testToken', accessTokenExpiresIn: 3600 } } }))
}));

describe('Login Component', () => {
  it('renders login form', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('submits login form with valid credentials', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    

    fireEvent.change(getByPlaceholderText('Enter Username'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testPassword' } });
    

    fireEvent.click(getByText('Login'));


    await waitFor(() => expect(localStorage.getItem('token')).toBe('testToken'));
    await waitFor(() => expect(localStorage.getItem('tokenExpiration')).toBe('3600'));
    await waitFor(() => expect(localStorage.getItem('username')).toBe('testUser'));
  });

  
});
