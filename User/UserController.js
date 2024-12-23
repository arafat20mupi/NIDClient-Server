const bcrypt = require('bcryptjs');
const User = require('./UserSchema'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JWT for authentication

// Register User
exports.register = async (req, res) => {
  const { name, phone, password } = req.body;

  try {
    // Check if the phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Phone number already in use" });
    }

    // Create a new user
    const newUser = new User({
      name,
      phone,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Login User
exports.login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Check if phone and password are provided
    if (!phone || !password) {
      return res.status(400).json({ success: false, message: "Please provide phone and password" });
    }

    // Find user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare provided password with stored password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET, // Ensure this is set in your environment variables
      { expiresIn: "1h" }
    );

    // Custom response based on the user's role
    if (user.role === "admin") {
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        user,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User login successful",
        token,
        user,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Authenticated User Routes (for protected routes)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Logout User (optional, to handle token removal)
exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: "User logged out successfully" });
};

// Get All Users (Admin Only)
exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
      total: users.length, // Return total count of users
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
