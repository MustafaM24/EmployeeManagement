const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;
const Admin = require('../models/Admin');
const Employee = require('../models/Employee');

const verifyUserRole = (userType) => async (req, res, next) => {
  const token = req.headers.authorization;

  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const formattedToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(formattedToken, secret);
    const userId = decoded._id;

    console.log('Searching for user ID:', userId);

    // Check if the user exists in the admin or employee collection based on userType
    let user;
    if (userType === 'admin') {
      user = await Admin.findById(_id);
    } else if (userType === 'employee') {
      user = await Employee.findById(_id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the decoded token payload to the request for further processing
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {verifyUserRole};
