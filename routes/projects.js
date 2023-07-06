const express = require('express');
const router = express.Router();

let projects = [];

function generateUniqueId() {
    // Generate a unique ID using a library or algorithm of your choice
    // For simplicity, let's use a random number for demonstration purposes
    return Math.floor(Math.random() * 100000).toString();
  }
  

// Get all projects
router.get('/', (req, res) => {
  res.json(projects);
});

// Create a project
router.post('/', (req, res) => {
  const project = req.body;
  project.id = generateUniqueId();
  projects.push(project);
  res.status(201).json(project);
});

// Update a project
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedProject = req.body;
  const project = projects.find(proj => proj.id === id);
  if (project) {
    project.name = updatedProject.name;
    // Update other project properties if needed
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// Delete a project
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = projects.findIndex(proj => proj.id === id);
  if (index !== -1) {
    projects.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});


module.exports = {router, projects};
