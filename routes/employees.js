const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const verify = require('../Middleware/verify')
const checkPrivilege = require('../Middleware/role');

// List all employees
router.get('/',verify.verifyToken, checkPrivilege.checkPrivilege(['employee', 'admin']), employeeController.getAllEmployees);

// Create an employee
router.post('/',verify.verifyToken, checkPrivilege.checkPrivilege([]), employeeController.createEmployee);

// Update an employee
router.put('/:id', checkPrivilege.checkPrivilege([]), employeeController.updateEmployee);

// Assign a department to an employee
router.post('/:id/departments/:departmentId',checkPrivilege.checkPrivilege([]), employeeController.assignDepartment);

// Assign a project to an employee
router.post('/:id/projects/:projectId',checkPrivilege.checkPrivilege([]), employeeController.assignProject);

// Update employee's contact information
router.put('/:id/contact',checkPrivilege.checkPrivilege([]), employeeController.updateContact);

// Update employee's personal information
router.put('/:id/personal',checkPrivilege.checkPrivilege([]), employeeController.updatePersonalDetails);

// Update employee's employment information
router.put('/:id/employment',checkPrivilege.checkPrivilege([]), employeeController.updateEmploymentHistory);

// Update employee's performance information
router.put('/:id/performance',checkPrivilege.checkPrivilege([]), employeeController.updatePerformanceReviews);

// Update employee's document information
router.put('/:id/documents',checkPrivilege.checkPrivilege([]), employeeController.updateDocuments);

// Update employee's trainingPrograms information
router.put('/:id/training',checkPrivilege.checkPrivilege([]), employeeController.updateTrainingPrograms);

// Update employee's performance Metrics information
router.put('/:id/performanceMetrics',checkPrivilege.checkPrivilege([]), employeeController.updatePerformanceMetrics);

// Update employee's feedback information
router.put('/:id/feedback',checkPrivilege.checkPrivilege([]), employeeController.updateFeedback);

// Remove an employee
router.delete('/:id',checkPrivilege.checkPrivilege([]), employeeController.deleteEmployee);

module.exports = router;
