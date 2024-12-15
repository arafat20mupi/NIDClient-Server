const jwt = require('jsonwebtoken');

// Middleware to authenticate the user based on the JWT token
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization token is missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to req.user
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error); // Log the error for debugging
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Middleware to check if the user has 'admin' role
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: "User is not authorized to access this route" });
  }
  next(); // Proceed to the next middleware or route handler if the user is an admin
};

// Generalized role-based access control middleware
const hasRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ success: false, message: "User is not authorized to access this route" });
    }
    next(); // Proceed if the user has the required role
  };
};

module.exports = { authMiddleware, isAdmin, hasRole };
