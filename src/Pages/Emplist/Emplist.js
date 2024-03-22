import React from 'react'
import './Emplist.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Emplist() {



  const navigate = useNavigate()
    const adduser =()=>{
        //navigate to reguster
        navigate('/')
    }
  return (
    <div>
        {/* <header>
        <Navbar bg='secondary' variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            <i className='fa-solid fa-users fa-flip'></i>
{''}   EM     </Navbar.Brand>
<Nav.Link href="/">Employee List</Nav.Link>
            <Nav.Link href="#action2">SignOut</Nav.Link>
        </Container>
      </Navbar>
        </header> */}
 
      
      <header>
        <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            <i className='fa-solid fa-users fa-flip'></i>
{''}   EM     </Navbar.Brand>
<Nav className="me-auto"style={{marginRight:'50px'}}>
            <Nav.Link href="/" style={{marginRight:10}}>Employee List</Nav.Link>
            {/* <Nav.Link href="#features">SignOut</Nav.Link> */}
            
          </Nav>

        <Navbar.Collapse className="justify-content-end ">
      
          <Navbar.Text>
            Signed in as: <a href="/login">Mark Otto</a>
          </Navbar.Text>
         
        </Navbar.Collapse>
        {"  "}
        <Button style={{'marginRight':'10px'}} type="submit">SignOut</Button>
    
        </Container>
       
           
           
      </Navbar>
        </header>


        <h1 >Welcome To admin panel</h1>
    </div>
  )
}

export default Emplist