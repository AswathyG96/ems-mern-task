import React from 'react'
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Hometable() {
    return (
        <>
            <div className="container mt-5">
                <Row>
                    <div className="col">
                        <Card className='shadow'>
                            <Table className='align-items-center'>
                                <thead className='thead-light'>
                                    <tr className='thead-light'>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Mobile</th>
                                        <th>Designation</th>
                                        <th>Gender</th>
                                        <th>Course</th>
                                        <th>CreateDate</th>

                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>1</td>
                                    <td><img className='rounded' src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" style={{width:'50px',height:'50px'}}  alt="" /></td>
                                    <td>Max Miller</td>
                                    <td>Max@gmail.com</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle  id="dropdown-basic">
                                                Active
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item >Active</Dropdown.Item>
                                                <Dropdown.Item >Deactive</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td>9961435812</td>
                                    <td>HR</td>
                                    <td>Male</td>
                                    <td>M.C.A</td>
                                    <td>13-feb-21</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle  variant='light' id="dropdown-basic1">
                                                <i class="fa-solid fa-ellipsis-vertical fs-4"></i>
                                                
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item >
                                                    <Link to={'/edit/1'} className="text-decoration-none">
                                                    <i className="fa-solid fa-pen text-primary me-2 fs-5"></i>
                                                    <span className='fs-5 text-dark'> Edit</span>
                                                    </Link>
                                                   </Dropdown.Item>
                                                <Dropdown.Item >
                                                    <div>
                                                    <i className="fa-solid fa-trash text-danger me-2 fs-5"></i>
                                                    <span className='fs-5 text-dark'> Delete</span> 
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tbody>

                            </Table>
                        </Card>
                    </div>
                </Row>
            </div>




        </>
    )
}

export default Hometable