import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

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
    <div>
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand href="/">
              <i className='fa-solid fa-users fa-flip'></i> EM
            </Navbar.Brand>
          </Container>
          {username && ( // Render username if it exists
            <Navbar.Text>
              Signed in as: {username}
            </Navbar.Text>
          )}
          <Button onClick={handleSignOut}>Sign out</Button>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
