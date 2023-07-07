// Create a file named "models.js"

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // Add other properties specific to a project
}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

module.exports = Project