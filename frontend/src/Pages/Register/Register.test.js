import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";

describe("Register Component", () => {
  test("renders Register component", () => {
    const { getByText, getByLabelText } = render(<Register />);
    
    // Check if the component renders the form elements
    const nameLabel = getByText(/Name/i);
    const emailLabel = getByText(/Email/i);
    const mobileLabel = getByText(/Mobile Number/i);
    const genderLabel = getByText(/Select Your Gender/i);
    const statusLabel = getByText(/Select Employee Status/i);
    const designationLabel = getByText(/Designation/i);
    const profileLabel = getByText(/Choose Profile Picture/i);
    const courseLabel = getByText(/Select Your Course/i);

    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(mobileLabel).toBeInTheDocument();
    expect(genderLabel).toBeInTheDocument();
    expect(statusLabel).toBeInTheDocument();
    expect(designationLabel).toBeInTheDocument();
    expect(profileLabel).toBeInTheDocument();
    expect(courseLabel).toBeInTheDocument();
  });

  test("allows user to fill out the form", async () => {
    const { getByLabelText, getByText } = render(<Register />);

    // Simulate user input
    fireEvent.change(getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(getByLabelText(/Mobile Number/i), { target: { value: "1234567890" } });
    fireEvent.click(getByLabelText(/Male/i)); // Select Male gender
    fireEvent.click(getByText(/Active/i)); // Select Active status
    fireEvent.click(getByText(/Hr/i)); // Select HR designation
    fireEvent.change(getByLabelText(/Choose Profile Picture/i), { target: { files: [new File([], 'profile.jpg')] } });
    fireEvent.click(getByLabelText(/M.C.A/i)); // Select M.C.A course

    // Submit the form
    fireEvent.click(getByText(/Submit/i));

    // Wait for form submission
    await waitFor(() => {
      expect(submitMock).toHaveBeenCalled(); // Assuming you have a mock function for form submission
    });
  });
});
