// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const Employee = require('../models/Employee');

// // Register a new user
// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // Check if the email is already registered
//     const existingUser = await Employee.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }
//     // Create a new user
//     const user = await Employee.create({ name, email, password });
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Find the user by email
//     const user = await Employee.findOne({email});
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     console.log("USER",user.password)
//     // Compare passwords
//     const isMatch = await user.comparePassword(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'User Logged In' });
//     }
//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id }, 'secretKey');
//     res.json({ token });
    
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Middleware to protect routes
// const requireAuth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, 'secretKey');
//     // Attach the user ID to the request for further processing
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { register, login, requireAuth };
