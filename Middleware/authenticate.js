const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const secret = process.env.SECRET_KEY;
const Joi = require('joi');


// Register a new Admin
// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

const register = async (req, res) => {
  try{
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
  });

  // const { error } = schema.validate(req.body);
  const { error } = schema.validate(req.body, { abortEarly: false });

  // if (error) return res.status(400).send(error.details);
  if (error) {
    const errors = error.details.map(e => e.message).join(', ');
    return res.status(400).send(errors);
  }
  const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await Admin.findOne({ email  });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // Create a new user
    const user = await Admin.create({ name, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
const login = async (req, res) => {
  try{
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  // if (error) return res.status(400).send(error.details);
  if (error) {
    const errors = error.details.map(e => e.message).join(', ');
    return res.status(400).send(errors);
  }
  const { email, password } = req.body;

    // Check if the user exists in either the Admin or Employee model
    const adminUser = await Admin.findOne({ email });
    const employeeUser = await Employee.findOne({ email });
    // i can add more user types int eh future

    // if i add more user types this code would need to be modified correct? is there a way to make it scalable?
    if (!adminUser && !employeeUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords based on the user type
    const user = adminUser || employeeUser;
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Login Failed' });
    }

    // Generate a JWT token with the role (userType) included
    const token = jwt.sign({ userId: user._id, privilege: user.privileges }, secret);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// scalable version for future use
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Define an array of user types (roles)
//     const userTypes = ['admin', 'employee']; // Add more user types in the future if needed

//     // Check if the user exists in any of the specified user types (collections)
//     let user;
//     for (const userType of userTypes) {
//       user = await findUserByEmail(userType, email);
//       if (user) break; // User found, no need to continue searching
//     }

//     // If no user is found in any of the collections, return error
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare passwords based on the user type
//     const isMatch = await user.comparePassword(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Login Failed' });
//     }

//     // Generate a JWT token with the role (userType) included
//     const token = jwt.sign({ userId: user._id, privilege: user.privileges }, secret);
//     res.json({ token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Helper function to find a user by email in a specific collection
// const findUserByEmail = async (userType, email) => {
//   const UserModel = userType === 'admin' ? Admin : Employee; // Add more user types here if needed
//   return await UserModel.findOne({ email });
// };


module.exports = { register, login};