const express = require('express');
const router = express.Router();

let departments = [];

function generateUniqueId() {
    // Generate a unique ID using a library or algorithm of your choice
    // For simplicity, let's use a random number for demonstration purposes
    return Math.floor(Math.random() * 100000).toString();
  }

//   // Get department by ID
// function getDepartmentById(id) {
//   return departments.find(dep => dep.id === id);
// }


// Get all departments
router.get('/', (req, res) => {
  res.json(departments);
});

// Create a department
router.post('/', (req, res) => {
  const department = req.body;
  department.id = generateUniqueId();
  departments.push(department);
  res.status(201).json(department);
});

// Update a department
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedDepartment = req.body;
  const department = departments.find(dep => dep.id === id);
  if (department) {
    department.name = updatedDepartment.name;
    // Update other department properties if needed
    res.json(department);
  } else {
    res.status(404).json({ message: 'Department not found' });
  }
});

// Delete a department
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = departments.findIndex(dep => dep.id === id);
  if (index !== -1) {
    departments.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Department not found' });
  }
});

module.exports = router;
