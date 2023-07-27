const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const verify = require('../Middleware/verify')
const checkPrivilege = require('../Middleware/role');

// Get all departments
router.get('/',verify.verifyToken, checkPrivilege.checkPrivilege(['employee', 'admin']), departmentController.getAllDepartments);

// Create a department
router.post('/',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), departmentController.createDepartment);

// Update a department
router.put('/:id',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), departmentController.updateDepartment);

// Delete a department
router.delete('/:id',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), departmentController.deleteDepartment);

module.exports = router;
