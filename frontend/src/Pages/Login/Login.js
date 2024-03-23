import axios from 'axios';
import React, { useState } from 'react';
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const log=()=>{
        navigate('/')
    }
  const [usernam, setUsernam] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsernam(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', {
        userName: usernam,
        password: password
      });
  
      const { username, accessToken, accessTokenExpiresIn } = response.data.token;
      console.log(accessToken, username, accessTokenExpiresIn);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('tokenExpiration', accessTokenExpiresIn);
      localStorage.setItem('username', username);
  
      // Reset the form
      setUsernam('');
      setPassword('');
      navigate('/emplist');
    } catch (error) {
      console.log(error);
      // Show alert with error message
      alert('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };
  

  return (
    <>
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand href="/">
              <i className='fa-solid fa-users fa-flip'></i> EM
            </Navbar.Brand>
          </Container>
          {/* {username && ( // Render username if it exists
            <Navbar.Text>
              Signed in as: {username}
            </Navbar.Text>
          )} */}
          {/* <Button onClick={handleSignOut}>Sign out</Button> */}
        </Navbar>
      </header>

  <div style={{backgroundImage:`url(/log.png)`}} >
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '500px' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Username"
                value={usernam}
                onChange={handleUsernameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Button onClick={handleSubmit} className='mt-4' variant="primary" type="submit" block>
              Login 
              
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
    </>
  );
};

export default Login;
