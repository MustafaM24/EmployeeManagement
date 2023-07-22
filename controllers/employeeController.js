const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Project = require('../models/Project');

// List all employees
exports.getAllEmployees = async (req, res) => {
  try {
    // const employees = await Employee.find().populate('department project');
    const  employees = await Employee.find({}, { name: 1, email: 1, project: 1, department: 1 });
    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  

// Create an employee
exports.createEmployee = async (req, res) => {
  try {
    // const employee = await Employee.create(req.body);
    // res.status(201).json(employee);
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Assign a department to an employee
exports.assignDepartment = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Assign a project to an employee
exports.assignProject = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's contact information
exports.updateContact = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's personal information
exports.updatePersonalDetails = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's employment information
exports.updateEmploymentHistory = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's performance information
exports.updatePerformanceReviews = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's document information
exports.updateDocuments = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's trainingPrograms information
exports.updateTrainingPrograms = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's performance Metrics information
exports.updatePerformanceMetrics = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's feedback information
exports.updateFeedback = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove an employee
exports.deleteEmployee = async (req, res) => {
  try {
    res.status(500).json({ message: 'Unathorized'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
