const bcrypt = require("bcryptjs");
const User = require("./UserSchema"); // Import the User model
const jwt = require("jsonwebtoken"); // Import JWT for authentication

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
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET, // Make sure the secret is set in environment variables
      { expiresIn: "1h" }
    );

    // Send response with token and user data
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
exports.loginUser = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the decoded token is null or undefined
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Send response with user data
    res.status(200).json({
      success: true,
      message: "User authenticated",
      user: decoded
    });
  } catch (error) {
    // Catching any errors such as invalid or expired JWT
    res.status(500).json({
      success: false,
      message: "Failed to authenticate token",
      error: error.message,
    });
  }
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



