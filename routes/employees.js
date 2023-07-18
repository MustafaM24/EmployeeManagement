const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const verify = require('../Middleware/authenticate')

// List all employees
router.get('/', employeeController.getAllEmployees);

// Create an employee
router.post('/', employeeController.createEmployee);

// Update an employee
router.put('/:id', employeeController.updateEmployee);

// Assign a department to an employee
router.post('/:id/departments/:departmentId', employeeController.assignDepartment);

// Assign a project to an employee
router.post('/:id/projects/:projectId', employeeController.assignProject);

// Update employee's contact information
router.put('/:id/contact', employeeController.updateContact);

// Update employee's personal information
router.put('/:id/personal', employeeController.updatePersonalDetails);

// Update employee's employment information
router.put('/:id/employment', employeeController.updateEmploymentHistory);

// Update employee's performance information
router.put('/:id/performance', employeeController.updatePerformanceReviews);

// Update employee's document information
router.put('/:id/documents', employeeController.updateDocuments);

// Update employee's trainingPrograms information
router.put('/:id/training', employeeController.updateTrainingPrograms);

// Update employee's performance Metrics information
router.put('/:id/performanceMetrics', employeeController.updatePerformanceMetrics);

// Update employee's feedback information
router.put('/:id/feedback', employeeController.updateFeedback);

// Remove an employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;