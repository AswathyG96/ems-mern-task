import React from 'react'
import './Home.css'
import {  Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Hometable from '../../Components/HomeTable/Hometable'

function Home() {
    const navigate = useNavigate()
    const adduser =()=>{
        //navigate to reguster
        navigate('/register')
    }
  return (
    <>
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

{/* 
<Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle /> */}
        <Navbar.Collapse className="justify-content-end ">
      
          <Navbar.Text>
            Signed in as: <a href="/login">Mark Otto</a>
          </Navbar.Text>
         
        </Navbar.Collapse>
        {"  "}
        <Button style={{'marginRight':'10px'}} type="submit">SignOut</Button>
      {/* </Container> */}
    {/* </Navbar> */}
        </Container>
       
           
           
      </Navbar>
        </header>





    <div className='container mt-5'>
        <div className="main_div">
            {/* search button and add employee */}
            <div className="search_Add d-flex justify-content-between">
                <div className="search col-lg-4">
                  <Form className='d-flex'>
                  {/* <Form.Control type="email" placeholder="Enter email" /> */}
                    <Form.Control type="text" placeholder="Search" className='me-2'/>
                    <Button variant='primary'>Search</Button>
                    </Form>  
                </div>
                <div className="add_btn">
                    <Button onClick={adduser} variant='success'  > <i className='fa-solid fa-user-plus'></i>Add</Button>
                </div>
            </div>
        </div>
        <div className="second_div">
            {/* table */}
            <Hometable/>
        </div>
    </div>
    
    
    </>
  )
}

export default Home