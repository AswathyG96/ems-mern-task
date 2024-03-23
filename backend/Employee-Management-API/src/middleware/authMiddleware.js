// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware function to validate token
const authMiddleware = (req, res, next) => {
  // Get token from request headers or query parameters or cookies, etc.
  if(!req.headers.authorization) return res.status(401).json({ message: 'Token is required' });
  const token = req.headers.authorization.split(' ')[1]
console.log(token);
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'my_secret_key');
    // Attach user data to request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
