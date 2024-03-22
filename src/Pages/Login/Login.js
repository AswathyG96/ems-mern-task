
import React, { useState } from 'react';
import { Container, Card, Form, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate()
    const log=()=>{
        navigate('/emplist')
    }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic for handling login
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form
    setEmail('');
    setPassword('');
  };

  return (

<div>


<header>
        <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            <i className='fa-solid fa-users fa-flip'></i>
{''}   EM     </Navbar.Brand>
        </Container>
      </Navbar>
        </header>







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
                value={email}
                onChange={handleEmailChange}
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

            <Button onClick={log} className='mt-4' variant="primary" type="submit" block>
              Login 
              
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
};

export default Login;
