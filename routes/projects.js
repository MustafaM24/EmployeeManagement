const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');


// Get all projects
router.get('/', projectController.getAllProjects);

// Create a project
router.post('/', projectController.createProject);

// Update a project
router.put('/:id', projectController.updateProject);

// Delete a project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
