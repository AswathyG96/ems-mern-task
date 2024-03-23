import React, { useState, useEffect } from "react";
import "./Edit.css";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";

import { Card, Row, Form, Button, Navbar, Nav, Container } from "react-bootstrap";

import Select from "react-select";
function Edit() {
  const option = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];
  const options = [
    { value: "HR", label: "Hr" },
    { value: "Manager", label: "Manager" },
    { value: "Sales", label: "Sales" },
  ];

  const { id } = useParams();
  console.log(id);
  const [employeeData, setEmployeeData] = useState({
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
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axiosInstance.get(`/getemployees/${id}`);
        const data = response.data.employee;
        console.log(data);
        setEmployeeData({
          f_Name: data.f_Name,
          f_Email: data.f_Email,
          f_Mobile: data.f_Mobile,
          f_gender: data.f_gender,
          status: data.status,
          f_Designation: data.f_Designation,
          f_Image: data.f_Image,
          f_Course: data.f_Course,
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      f_Course: value,
    }));
  };


  const handleFileChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      f_Image: e.target.files[0],
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !employeeData.f_Name ||
      !employeeData.f_Email ||
      !employeeData.f_Mobile ||
      !employeeData.f_gender ||
      !employeeData.status ||
      !employeeData.f_Designation ||
      !employeeData.f_Course
    ) {
      setValidationError("Please fill out all fields.");
      setTimeout(() => {
        setValidationError(null);
      }, 2000);
      return;
    }
    try {
      const formDataToSend = new FormData();
      Object.entries(employeeData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      console.log(formDataToSend,'__000000000000000000000000');
      const response = await axiosInstance.put(
        `/edit-employees/${id}`,
        formDataToSend
      ).catch((error) => {
      
        alert(JSON.stringify(error.response.data));
        setTimeout(() => {
          setValidationError(null);
        }, 2000);
        return;
      });
      console.log(response);
      // Reset form data after successful submission
      setEmployeeData({
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
        <h2 className="text-center mt-3">Update Employee Details</h2>
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
                  onChange={handleInputChange}
                  value={employeeData.f_Name}
                  placeholder="Enter Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicemail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="f_Email"
                  type="email"
                  onChange={handleInputChange}
                  value={employeeData.f_Email}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicmobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="f_Mobile"
                  type="text"
                  onChange={handleInputChange}
                  value={employeeData.f_Mobile}
                  placeholder="Enter mobile number"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicgender">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={"Male"}
                  name="f_gender"
                  value={"Male"}
                  checked={employeeData.f_gender === "Male"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type={"radio"}
                  label={"Female"}
                  name="f_gender"
                  value={"Female"}
                  checked={employeeData.f_gender === "Female"}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicstatus">
                <Form.Label>Select Employee Status</Form.Label>
                <Select
                  options={option}
                  onChange={(selectedOption) =>
                    setEmployeeData((prevState) => ({
                      ...prevState,
                      status: selectedOption.value,
                    }))
                  }
                  value={{
                    value: employeeData.status,
                    label: employeeData.status,
                  }}
                ></Select>
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicdesignation"
              >
                <Form.Label>Designation</Form.Label>
                <Select
                  options={options}
                  value={{
                    value: employeeData.f_Designation,
                    label: employeeData.f_Designation,
                  }}
                  onChange={(selectedOption) =>
                    setEmployeeData((prevState) => ({
                      ...prevState,
                      f_Designation: selectedOption.value,
                    }))
                  }
                ></Select>
              </Form.Group>
              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicprofile"
              >
                <Form.Label>Choose Profile Picture</Form.Label>
                <Form.Control name="user_profile" type="file"  onChange={handleFileChange} />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasiccourse">
                <Form.Label>Select Your Course</Form.Label>
                <Form.Label>Select Your Course</Form.Label>
                <Form.Check
                  label="M.C.A"
                  name="course"
                  type={"checkbox"}
                  value={"M.C.A"}
                  checked={employeeData.f_Course === "M.C.A"}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  label="B.C.A"
                  name="course"
                  type={"checkbox"}
                  value={"B.C.A"}
                  checked={employeeData.f_Course === "B.C.A"}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  label="B.S.C"
                  name="course"
                  type={"checkbox"}
                  value={"B.S.C"}
                  checked={employeeData.f_Course === "B.S.C"}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
              <Button className="mt-3" type="submit" variant="primary">
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Edit;
