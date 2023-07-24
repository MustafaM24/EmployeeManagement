
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;


const verifyToken = (req, res, next) => {
  // Get the token from the request headers or other sources
  const token = req.headers.authorization;
  
  if (!token) {
    // Token not provided
    return res.status(401).json({ message: 'No token provided' });
  }

  console.log(token)
  // remove bearer from token
  const formattedToken = token.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(formattedToken, secret);
    // Attach the decoded token payload to the request for further processing

    req.decoded = decoded;
    next();
  } catch (error) {
    // Token verification failed
    console.log(error)
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {verifyToken};
