import React, { useState } from "react";
import "./Register.css";
import { Card, Row, Form, Button, Alert, Navbar, Nav, Container } from "react-bootstrap";
import Select from "react-select";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_gender: "",
    status: "",
    f_Designation: "",
    f_Image: null,
    f_Course: "",
  });
  const [validationError, setValidationError] = useState("");

  const option = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const options = [
    { value: "HR", label: "Hr" },
    { value: "Manager", label: "Manager" },
    { value: "Sales", label: "Sales" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    if (name === "f_gender") {
      // If the clicked gender option is already selected, uncheck it
      if (formData.f_gender === value) {
        setFormData((prevState) => ({
          ...prevState,
          f_gender: "",
        }));
      } else {
        // If the clicked gender option is not selected, set it as the selected option
        setFormData((prevState) => ({
          ...prevState,
          f_gender: value,
        }));
      }
    } else {
      // For other inputs, update the form data as usual
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      f_Image: e.target.files[0],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      f_Course: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.f_Name ||
      !formData.f_Email ||
      !formData.f_Mobile ||
      !formData.f_gender ||
      !formData.status ||
      !formData.f_Designation ||
      !formData.f_Course
    ) {
      setValidationError("Please fill out all fields.");
      setTimeout(() => {
        setValidationError(null);
      }, 2000);
      return;
    }
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      console.log(formData);
      const response = await axiosInstance.post(
        "/employees",
        formDataToSend
      ).catch((error) => {
        console.log(error,'++++++++++++++++++');
        alert(JSON.stringify(error.response.data));
        setTimeout(() => {
          setValidationError(null);
        }, 2000);
        return;
      });
      alert("Employee added successfully:");
      console.log(response);
      // Reset form data after successful submission
      setFormData({
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_gender: "",
        status: "",
        designation: "",
        f_Image: null,
        f_Course: "",
      });
      setValidationError("");
    

    } catch (error) {
      // setValidationError(error);
      // setTimeout(() => {
      //   setValidationError(null);
      // }, 2000);
      console.error("Error:", error);
    }
  };
  
  const handleSignOut = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('username');
    
    // Navigate to login page
    navigate('/login');
  };
    // Retrieve username from localStorage
const username = localStorage.getItem('username');

  return (
    <>
    <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand href="/">
              <i className='fa-solid fa-users fa-flip'></i> EM
            </Navbar.Brand>
            <Nav className="me-auto"style={{marginRight:'50px'}}>
            <Nav.Link href="/" style={{marginRight:10}}>Employee List</Nav.Link>
            {/* <Nav.Link href="#features">SignOut</Nav.Link> */}
            
          </Nav>

          </Container>
         
          {username && ( // Render username if it exists
            <Navbar.Text>
              Signed in as: {username}
            </Navbar.Text>
          )}
          <Button style={{marginLeft:10,marginRight:10,margintop:10,height:40,maxWidth:180}} onClick={handleSignOut}>SignOut</Button>
        </Navbar>
      </header>
      <div className="container mt-5">
        <h2 className="text-center mt-3">Register Employee Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="text-center">
            <img
              className=" border p-1 rounded-circle"
              src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
              style={{ width: "50px", height: "50px" }}
              alt=""
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicfname">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="f_Name"
                  type="text"
                  placeholder="Enter Name"
                  value={formData.f_Name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicemail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="f_Email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.f_Email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicmobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="f_Mobile"
                  type="text"
                  placeholder="Enter mobile number"
                  value={formData.f_Mobile}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicgender">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="f_gender"
                  value="Male"
                  checked={formData.f_gender === "Male"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="f_gender"
                  value="Female"
                  checked={formData.f_gender === "Female"}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicstatus">
                <Form.Label>Select Employee Status</Form.Label>
                <Select
                  options={option}
                  onChange={(selectedOption) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      status: selectedOption.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicdesignation"
              >
                <Form.Label>Designation</Form.Label>
                <Select
                  options={options}
                  onChange={(selectedOption) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      f_Designation: selectedOption.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicprofile"
              >
                <Form.Label>Choose Profile Picture</Form.Label>
                <Form.Control
                  name="user_profile"
                  type="file"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasiccourse">
                <Form.Label>Select Your Course</Form.Label>
                <Form.Check
                  label="M.C.A"
                  name="course"
                  type={"checkbox"}
                  value={"M.C.A"}
                  checked={formData.f_Course === "M.C.A"}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  label="B.C.A"
                  name="course"
                  type={"checkbox"}
                  value={"B.C.A"}
                  checked={formData.f_Course === "B.C.A"}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  label="B.S.C"
                  name="course"
                  type={"checkbox"}
                  value={"B.S.C"}
                  checked={formData.f_Course === "B.S.C"}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
              {validationError && (
                <Alert variant="danger">{validationError}</Alert>
              )}
              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Register;
