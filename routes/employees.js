const express = require('express');
const router = express.Router();

// const departmentsRouter = require('./departments.js');
const projectsRouter = require('./projects.js');
// const projects = require('./projects.js');



let employees = [];

function generateUniqueId() {
  // Generate a unique ID using a library or algorithm of your choice
  // For simplicity, let's use a random number for demonstration purposes
  return Math.floor(Math.random() * 100000).toString();
}

// // Get department by ID
// function getDepartmentById(id) {
//   return departments.find(dep => dep.id === id);
// }
 
// List all employees
router.get('/', (req, res) => {
  res.json(employees);
});

// Create an employee
router.post('/', (req, res) => {
  const employee = req.body;
  employee.id = generateUniqueId();
  employee.department = [];
  employee.projects = [];
  employees.push(employee);
  res.status(201).json(employee);
});

// Update an employee
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedEmployee = req.body;
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    employee.name = updatedEmployee.name;
    // Update other employee properties if needed
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Assign a department to an employee
// router.post('/:id/departments/:departmentId', (req, res) => {
//   const employeeId = req.params.id;
//   const departmentId = req.params.departmentId;
//   const employee = employees.find(emp => emp.id === employeeId);
//   const department = departments.find(dep => dep.id === departmentId);
//   if (employee && department) {
//     employee.department.push(department);
//     res.json(employee);
//   } else {
//     res.status(404).json({ message: 'Employee or department not found' });
//   }
// });
router.post('/:id/department/:departmentId', (req, res) => {
  const employeeId = req.params.id;
  const departmentId = req.params.departmentId;
  const employee = employees.find(emp => emp.id === employeeId);
  const department = departments.find(dep => dep.id === departmentId);
  if (employee && department) {
    employee.department.push(department);
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee or department not found' });
  }
});



// Assign a project to an employee
// router.post('/:id/project/:projectId', (req, res) => {
//   const employeeId = req.params.id;
//   const projectId = req.params.projectId;
//   const employee = employees.find(emp => emp.id === employeeId);
//   const project = projects.find(proj => proj.id === projectId);
//   if (employee && project) {
//     employee.projects.push(project);
//     res.json(employee);
//   } else {
//     res.status(404).json({ message: 'Employee or project not found' });
//   }
// });
router.post('/:id/projects/:projectId', (req, res) => {
  const employeeId = req.params.id;
  const projectId = req.params.projectId;
  const employee = employees.find(emp => emp.id === employeeId);
  const project = projectsRouter.projects.find(project => project.id === projectId);
  if (employee && project) {
    employee.projects.push(project);
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee or project not found' });
  }
});


// Remove an employee
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

module.exports = router;
