const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const employeeController = require('../controllers/employeeController')
const verify = require('../Middleware/authenticate')

// List all employees (only accessible by admins)
router.get('/', verify.verifyToken, adminController.getAllEmployees);

// Create an employee (only accessible by admins)
router.post('/', adminController.createEmployee);

// Update an employee (only accessible by admins)
router.put('/:id', adminController.updateEmployee);

// Assign a department to an employee (only accessible by admins)
router.post('/:id/departments/:departmentId', adminController.assignDepartment);

// Assign a project to an employee (only accessible by admins)
router.post('/:id/projects/:projectId', adminController.assignProject);

// Update employee's contact information (only accessible by admins)
router.put('/:id/contact', adminController.updateContact);

// Update employee's personal information (only accessible by admins)
router.put('/:id/personal', adminController.updatePersonalDetails);

// Update employee's employment information (only accessible by admins)
router.put('/:id/employment', adminController.updateEmploymentHistory);

// Update employee's performance information (only accessible by admins)
router.put('/:id/performance', adminController.updatePerformanceReviews);

// Update employee's document information (only accessible by admins)
router.put('/:id/documents', adminController.updateDocuments);

// Update employee's trainingPrograms information (only accessible by admins)
router.put('/:id/training', adminController.updateTrainingPrograms);

// Update employee's performance Metrics information (only accessible by admins)
router.put('/:id/performanceMetrics', adminController.updatePerformanceMetrics);

// Update employee's feedback information (only accessible by admins)
router.put('/:id/feedback', adminController.updateFeedback);

// Remove an employee (only accessible by admins)
router.delete('/:id', adminController.deleteEmployee);

module.exports = router;
