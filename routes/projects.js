const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');
const verify = require('../Middleware/verify')
const checkPrivilege = require('../Middleware/role');

// Get all projects
router.get('/',verify.verifyToken, checkPrivilege.checkPrivilege(['employee', 'admin']), projectController.getAllProjects);

// Create a project
router.post('/',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), projectController.createProject);

// Update a project
router.put('/:id',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), projectController.updateProject);

// Delete a project
router.delete('/:id',verify.verifyToken, checkPrivilege.checkPrivilege(['admin']), projectController.deleteProject);

module.exports = router;
