// controllers/employeeController.js

const employeeService = require('../services/employeeService');

exports.createEmployee = async (req, res) => {
  try {
    
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course,status } = req.body;

    // Construct employee data object
    const employeeData = {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      status,
      f_Image: req.file ? req.file.path : '' 
    };

    const employee = await employeeService.createEmployee(employeeData);
    res.status(201).json({ employee, message: 'Employee created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteEmployee = async (req, res) => {
  try {
      const { f_Id } = req.params;
      const message = await employeeService.deleteEmployeeByFId(f_Id);
      res.json({ message: message });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.listEmployees = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const employee = await employeeService.getAllEmployees(baseUrl);
    res.status(200).json({ employee, message: 'Employee detail fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAnEmployeeDetail = async (req, res) => {
  try {
      const { f_Id } = req.params;
      const data = await employeeService.getEmployeeByFId(f_Id);
      res.status(200).json({ employee: data });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



exports.updateEmployee = async (req, res) => {
  console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiii');
  try {
    const { f_Id } = req.params;
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course,status } = req.body;

    // Construct updated employee data object
    const updatedEmployeeData = {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      status,
      f_Image: req.file ? req.file.path : '' 
    };
console.log(updatedEmployeeData,'+++++++++++++++++++++++++');
    // Update the employee data in the database
    const updatedEmployee = await employeeService.updateEmployee(f_Id, updatedEmployeeData);
    res.status(200).json({ updatedEmployee, message: 'Employee updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};