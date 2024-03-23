import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Edit from './Edit';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: '123' })),
}));


jest.mock('../../utils/axiosInstance', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      employee: {
        f_Name: 'John Doe',
        f_Email: 'john@example.com',
        f_Mobile: '1234567890',
        f_gender: 'Male',
        status: 'Active',
        f_Designation: 'HR',
        f_Course: 'M.C.A',
      }
    }
  })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Edit Component', () => {
  it('renders edit form', async () => {
    const { getByLabelText, getByText } = render(<Edit />);
    

    await waitFor(() => {
      expect(getByLabelText('Name')).toHaveValue('John Doe');
      expect(getByLabelText('Email')).toHaveValue('john@example.com');
      expect(getByLabelText('Mobile Number')).toHaveValue('1234567890');
      expect(getByLabelText('Male')).toBeChecked();
      expect(getByLabelText('Active')).toBeChecked();
      expect(getByLabelText('HR')).toBeChecked();
      expect(getByLabelText('M.C.A')).toBeChecked();
    });
    
    expect(getByText('Submit')).toBeInTheDocument();
  });

  
});
