import React, { useState, useEffect } from 'react';
import './Home.css';
import { Alert, Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Hometable from '../../Components/HomeTable/Hometable';

import axiosInstance from "../../utils/axiosInstance";

function Home() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployee, setFilteredEmployee] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to fetch employee data from the backend API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosInstance.get('/list-employees');
                setEmployees(response.data.employee);
            } catch (error) {
                setError(error.message);
            }
        };
    
        fetchEmployees(); // Call fetchEmployees function directly inside useEffect
    
    }, []);  // Fetch data when component mounts

    const adduser = () => {
        // Navigate to register page
        navigate('/register');
    };

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleDelete = async (id) => {
        try {
            // Send a DELETE request to the API endpoint
            await axiosInstance.delete(`/delete-employee/${id}`);
            // Remove the deleted employee from the state to update the table immediately
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.f_Id !== id));
            console.log('Employee deleted successfully:', id);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    // Function to filter employees based on search query
    const filteredEmployees = employees.filter(employee => {
        const { f_Name, f_Email } = employee;
        const searchTerms = searchQuery.toLowerCase().trim();
        return f_Name.toLowerCase().includes(searchTerms) || f_Email.toLowerCase().includes(searchTerms);
    });
    // const navigate = useNavigate();

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
    {/* </div> */}
            <div className="container mt-5">
                <div className="main_div">
                    {/* Search button and add employee */}
                    <div className="search_Add d-flex justify-content-between">
                        <div className="search col-lg-4">
                            <Form className='d-flex'>
                                <Form.Control type="text" placeholder="search" value={searchQuery} onChange={handleSearchChange} className='me-2'/>
                                <Button variant='secondary'>Search</Button>
                            </Form>  
                        </div>
                        <div className="add-btn">
                        {filteredEmployees.length > 0 && <span className="badge bg-secondary ms-2">count - {filteredEmployees.length}</span>}
                            <Button onClick={adduser} variant='success'><i className='fa-solid fa-user-plus'></i>Add</Button>
                        </div>
                    </div>
                </div>
                <div className="second_div">
                    {/* Table */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Hometable employees={filteredEmployees} onDelete={handleDelete} />
                </div>
            </div>
        </>
    );
}

export default Home;
