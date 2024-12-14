const jwt = require('jsonwebtoken');

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.user = decoded; // Store the decoded user data on the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware };
