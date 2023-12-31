const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Project = require('../models/Project');
const Admin = require('../models/Admin');
const Mid = require('../Middleware/authenticate')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// List all employees
exports.getAllEmployees = async (req, res) => {
    try {
      const employees = await Employee.find().populate('department project');
      res.json(employees);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// // Create an employee
// exports.createEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.create(req.body);
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Create an employee
// exports.createEmployee = async (req, res) => {
//   try {
    // const employee = await Employee.create(req.body);
    // const Employee,
    
exports.createEmployee = async (req, res) => {
  try{
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  // if (error) return res.status(400).send(error.details);
  if (error) {
    const errors = error.details.map(e => e.message).join(', ');
    return res.status(400).send(errors);
  }
  const {name, email, password } = req.body;

    // const { name, email, password } = req.body;
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const employeeUser = await Employee.create(req.body)
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an employee
// exports.updateEmployee = async (req, res) => {
//   try {
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (updatedEmployee) {
//       res.json(updatedEmployee);
//     } else {
//       res.status(404).json({ message: 'Employee not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
exports.updateEmployee = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Employee.findOne({ email });
    const adminUser = await Admin.findOne({ email });
    const employeeUser = await Employee.findOne({ email });
    // if i add more user types this code would need to be modified correct? is there a way to make it scalable?
    if (adminUser || employeeUser) {
      return res.status(401).json({ message: 'Email already registered, Please use another Email' });
    } else{

    // if (existingUser) {
    //   return res.status(400).json({ message: 'Email already registered, Please use another Email' });
    // }
    // const user = adminUser || employeeUser;
    // const updatedEmployee = await employeeUser.findByIdAndUpdate(
    //   req.params.id,
    //   console.log(req.params.id),
    //   req.body,
    //   console.log(req.body,),
    //   { new: true }
    // );
    // if (updatedEmployee) {
    //   res.json(updatedEmployee);
    // } else {
    //   res.status(404).json({ message: 'Employee not found' });
    // }
        const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Assign a department to an employee
exports.assignDepartment = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const department = await Department.findById(req.params.departmentId);
    if (employee && department) {
      employee.department.push(department);
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee or department not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Assign a project to an employee
exports.assignProject = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const project = await Project.findById(req.params.projectId);
    if (employee && project) {
      employee.project.push(project);
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee or project not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's contact information
exports.updateContact = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { contact: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's personal information
exports.updatePersonalDetails = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { personalDetails: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's employment information
exports.updateEmploymentHistory = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { employmentHistory: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's performance information
exports.updatePerformanceReviews = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { performanceReviews: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's document information
exports.updateDocuments = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { documents: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's trainingPrograms information
exports.updateTrainingPrograms = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { trainingPrograms: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's performance Metrics information
exports.updatePerformanceMetrics = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { performanceMetrics: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee's feedback information
exports.updateFeedback = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { feedback: req.body },
      { new: true }
    );
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
