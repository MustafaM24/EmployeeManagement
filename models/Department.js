// Create a file named "models.js"

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  // Add other properties specific to a department
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department
