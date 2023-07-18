const express = require('express');
const router = express.Router();

const departmentsRouter = require('./departments.js');
const projectsRouter = require('./projects.js');
// const projects = require('./projects.js');

const Employee = require('../models/Employee.js');
const Project = require('../models/Project.js');
const Department = require('../models/Department.js');


// List all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().populate('department project');
    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create an employee
router.post('/', async (req, res) => {
  try {
    // const employee = new Employee(req.body);
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assign a department to an employee
router.post('/:id/departments/:departmentId', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const department = await Department.findById(req.params.departmentId);
    if (employee && department) {
      employee.department.push(department);
      // employee.department = department;
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee or department not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assign a project to an employee
router.post('/:id/projects/:projectId', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const project = await Project.findById(req.params.projectId);
    if (employee && project) {
      employee.projects.push(project);
      // employee.project = project;
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee or project not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
 }
});

// Update employee's contact information
router.put('/:id/contact', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { contact: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee's personal information
router.put('/:id/personal', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { personalDetails: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee's employment information
router.put('/:id/employment', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { employmentHistory: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee's performance information
router.put('/:id/performance', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { performanceReviews: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee's document information
router.put('/:id/documents', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { documents: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee's trainingPrograms information
router.put('/:id/training', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { trainingPrograms: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee's performance Metrics information
router.put('/:id/performanceMetrics', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { performanceMetrics: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update employee's feedback information
router.put('/:id/feedback', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { feedback: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Remove an employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {router};