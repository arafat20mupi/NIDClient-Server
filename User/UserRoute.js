// UserRoutes.js
const express = require("express");
const { register, login, getAll, getUser, logout, updateUserProfile, getAllUsers } = require("./UserController");
const { authMiddleware, isAdmin } = require("../Middleware/Middleware");

const route = express.Router();

// Public routes (no authentication needed)
route.post('/register', register);  // Register a new user
route.post('/login', login);  // Login a user

// Protected routes (authentication required)
route.get('/user', authMiddleware, getUser);  // Get authenticated user's info
route.put('/user', authMiddleware, updateUserProfile);  // Update user's profile
route.get('/logout', authMiddleware, logout);  // Logout user
route.get('/getAllUsers', getAllUsers);
// Admin-only routes
route.get('/admin/users', authMiddleware, isAdmin, getAll);  // Get all users (admin only)




module.exports = route;



module.exports = route;
