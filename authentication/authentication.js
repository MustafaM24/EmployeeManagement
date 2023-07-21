const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
require('dotenv').config();
const secret = process.env.SECRET_KEY;



// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the email is already registered
    const existingUser = await Admin.findOne({ email });
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

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await Admin.findOne({email});
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log("USER",user.password)
    // Compare passwords
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Login Failed' });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secret);
    res.json({ token });
    // return token
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { register, login };