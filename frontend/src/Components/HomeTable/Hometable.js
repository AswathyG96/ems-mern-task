import React, { useState } from 'react';
import { Card, Dropdown, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Hometable({ employees, onDelete }) {
    const [sortBy, setSortBy] = useState('f_Name'); // Default sorting by name
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

    const handleSort = (column) => {
        if (sortBy === column) {
            // Toggle sorting order if the same column is clicked again
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sorting column and reset sorting order to ascending
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    // Sort employees array based on the selected column and sorting order
    const sortedEmployees = employees.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortBy === 'f_Id') {
            // For numeric comparison
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            // For string comparison
            if (sortOrder === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        }
    });

    const renderSortSymbol = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? '▲' : '▼';
        }
        return null;
    };


    return (
        <>
            <div className="container mt-5">
                <Card className='shadow'>
                    <Table className='align-items-center r'responsive="sm">
                        <thead className='thead-light'>
                            <tr className='thead-light'>
                                <th onClick={() => handleSort('f_Id')}>ID {renderSortSymbol('f_Id')}</th>
                                <th>Image</th>
                                <th onClick={() => handleSort('f_Name')}>Name {renderSortSymbol('f_Name')}</th>
                                <th onClick={() => handleSort('f_Email')}>Email {renderSortSymbol('f_Email')}</th>
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
                            {sortedEmployees.map(employee => (
                                <tr key={employee._id}>
                                    <td>{employee.f_Id}</td>
                                    <td><img className='rounded' src={employee.f_Image} style={{ width: '50px', height: '50px' }} alt="" /></td>
                                    <td>{employee.f_Name}</td>
                                    <td>{employee.f_Email}</td>
                                  
                                    <td>{employee.status}</td>
                                    <td>{employee.f_Mobile}</td>
                                    <td>{employee.f_Designation}</td>
                                    <td>{employee.f_gender}</td>
                                    <td>{employee.f_Course}</td>
                                    <td>{employee.f_Createdate}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle  variant='light' id="dropdown-basic1">
                                                <i className="fa-solid fa-ellipsis-vertical fs-4"></i>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item >
                                                    <Link to={`/edit/${employee.f_Id}`} className="text-decoration-none">
                                                        <i className="fa-solid fa-pen text-primary me-2 fs-5"></i>
                                                        <span className='fs-5 text-dark'> Edit</span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => onDelete(employee.f_Id)}>
                                                    <div>
                                                        <i className="fa-solid fa-trash text-danger me-2 fs-5"></i>
                                                        <span className='fs-5 text-dark'> Delete</span> 
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </div>
        </>
    );
}

export default Hometable;
