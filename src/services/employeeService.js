// services/employeeService.js

const employee = require('../models/employee');

exports.createEmployee = async (employeeDetail) => {
  try {
    // Create a new employee using the tEmployee model
    console.log(employeeDetail);
    const employeeData = await employee.create(employeeDetail);
    return employeeData;
  } catch (error) {
    console.log(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.f_Email) {
      // Duplicate key error for f_Email field
      throw new Error('Email Duplication');
      // Handle the duplicate key error here, e.g., display a user-friendly message
    } else {
      throw new Error('Error creating employee');
    }
   
  }
};


exports.getAllEmployees = async (baseUrl) => {
    try {
        // Fetch list of employees from the database
        const employees = await employee.find();
   
        // Map through employees and modify the image path to include server URL
        const employeesWithImagePaths = employees.map(employee => ({
          ...employee.toJSON(),
          f_Image: `${baseUrl}/${employee.f_Image}` // Modify image path to include server URL
        }));
    
        return employeesWithImagePaths; // Send the list of employees with image paths to the client
      } catch (error) {
        throw new Error('Error fetching employees');
      }
};


exports.getEmployeeByFId = async (f_Id)=>{
  try {
    const result =await employee.findOne({ f_Id });
    if(!result) return 'employee not found';
    else return result
 } catch (error) {
     throw new Error('Error in finding employee');
 }
};


exports.deleteEmployeeByFId = async (f_Id) => {
    try {
       const res =await employee.findOneAndDelete({ f_Id });
       if(!res) return 'employee not found';
       else return 'employee deleted successfully'
    } catch (error) {
        throw new Error('Error deleting employee');
    }
};



exports.updateEmployee = async (id, updatedEmployeeData) => {
  try {
 
    const employeeDetail = await employee.findOne({ f_Id: id });

console.log(updatedEmployeeData,'++++++++++++++++++++++++++++============');
    if (!employeeDetail) {
      throw new Error('Employee not found');
    }

    // Update the employee fields with the updated data
    employeeDetail.f_Name = updatedEmployeeData.f_Name;
    employeeDetail.status = updatedEmployeeData.status;
    employeeDetail.f_Email = updatedEmployeeData.f_Email;
    employeeDetail.f_Mobile = updatedEmployeeData.f_Mobile;
    employeeDetail.f_Designation = updatedEmployeeData.f_Designation;
    employeeDetail.f_gender = updatedEmployeeData.f_gender;
    employeeDetail.f_Course = updatedEmployeeData.f_Course;
    employeeDetail.f_Image = updatedEmployeeData.f_Image;

    console.log(employeeDetail);
    // Save the updated employee data
    const updatedEmployee = await employee.findOneAndUpdate( { f_Id: id},employeeDetail, { new: true });

    return updatedEmployee;
  } catch (error) {
    throw error;
  }
};