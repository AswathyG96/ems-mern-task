import React from 'react'
import './Register.css';
import { Card, Row, Form, Button } from 'react-bootstrap';

import Select from 'react-select'
function Register() {
    const option = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ]
    const options = [
        { value: 'HR', label: 'Hr' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Sales', label: 'Sales' },
    ]
    return (
        <>
            <div className='container mt-5'>
                <h2 className="text-center mt-3">Register Employee Details</h2>
                <Card className='shadow mt-3 p-3'>
                    <div className="text-center">
                        <img className=' border p-1 rounded-circle' src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                            style={{ width: '50px', height: '50px' }} alt="" />
                    </div>
                    <Form>
                        <Row>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicfname">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name='fname' type="text" placeholder="Enter Name" />

                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicemail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name='email' type="email" placeholder="Enter email" />

                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicmobile">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control name='mobile' type="text" placeholder="Enter mobile number" />

                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicgender">
                                <Form.Label>Select Your Gender</Form.Label>
                                <Form.Check
                                    type={"radio"}
                                    label={"Male"}
                                    name='gender'
                                    value={"Male"}
                                />
                                <Form.Check
                                    type={"radio"}
                                    label={"Female"}
                                    name='gender'
                                    value={"Female"}
                                />

                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicstatus">
                                <Form.Label>Select Employee Status</Form.Label>
                                <Select options={option}></Select>


                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicdesignation">
                                <Form.Label>Designation</Form.Label>
                                <Select options={options}></Select>


                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicprofile">
                                <Form.Label>Choose Profile Picture</Form.Label>
                                <Form.Control name='user_profile' type="file" />

                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasiccourse">
                                <Form.Label>Select Your Course</Form.Label>
                                <Form.Check

                                    label="M.C.A"
                                    name="group1"
                                    type={"checkbox"}
                                    value={"M.C.A"}

                                />
                                <Form.Check

                                    label="B.C.A"
                                    name="group1"
                                    type={"checkbox"}
                                    value={"B.C.A"}

                                />
                                <Form.Check

                                    label="B.S.C"
                                    name="group1"
                                    type={"checkbox"}
                                    value={"B.S.C"}

                                />



                            </Form.Group>
       

       <Button  className='mt-3' variant='primary'  type='submit' >Submit</Button>

                        </Row>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default Register


