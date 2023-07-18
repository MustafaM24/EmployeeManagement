const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Get all departments
router.get('/', departmentController.getAllDepartments);

// Create a department
router.post('/', departmentController.createDepartment);

// Update a department
router.put('/:id', departmentController.updateDepartment);

// Delete a department
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
