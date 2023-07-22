const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const employeeController = require('../controllers/employeeController')
const verify = require('../Middleware/verify')
const checkPrivilege = require('../Middleware/role');

// List all employees (only accessible by admins)
// router.get('/', verify.verifyToken, adminController.getAllEmployees);
router.get('/', verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.getAllEmployees);

// Create an employee (only accessible by admins)
router.post('/',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.createEmployee);

// Update an employee (only accessible by admins)
router.put('/:id',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updateEmployee);

// Assign a department to an employee (only accessible by admins)
router.post('/:id/departments/:departmentId',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.assignDepartment);

// Assign a project to an employee (only accessible by admins)
router.post('/:id/projects/:projectId',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.assignProject);

// Update employee's contact information (only accessible by admins)
router.put('/:id/contact',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updateContact);

// Update employee's personal information (only accessible by admins)
router.put('/:id/personal',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updatePersonalDetails);

// Update employee's employment information (only accessible by admins)
router.put('/:id/employment',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updateEmploymentHistory);

// Update employee's performance information (only accessible by admins)
router.put('/:id/performance',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updatePerformanceReviews);

// Update employee's document information (only accessible by admins)
router.put('/:id/documents',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updateDocuments);

// Update employee's trainingPrograms information (only accessible by admins)
router.put('/:id/training',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updateTrainingPrograms);

// Update employee's performance Metrics information (only accessible by admins)
router.put('/:id/performanceMetrics',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updatePerformanceMetrics);

// Update employee's feedback information (only accessible by admins)
router.put('/:id/feedback',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.updateFeedback);

// Remove an employee (only accessible by admins)
router.delete('/:id',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), adminController.deleteEmployee);

module.exports = router;
