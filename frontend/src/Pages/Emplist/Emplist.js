import React from 'react'
import './Emplist.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Emplist() {


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
        <Nav className="me-auto">
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
  {/* <h1 style={{alignItems:"center",height:"100%",display:"flex"}}>Welcome To Admin Panel</h1> */}
  <div>
    <img src="https://cdni.iconscout.com/illustration/premium/thumb/admin-services-4500540-3804451.png" width={800} alt="" />
     {/* <h1>WELCOME</h1> */}
  </div>
  </div>
  )
}

export default Emplist