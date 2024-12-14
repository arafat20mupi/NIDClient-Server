const mongoose = require("mongoose");
const UserSchemaMethod = require("./UserSchemaMethod");

// Define the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Ensure phone number is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, {
  timestamps: true, // Add createdAt and updatedAt fields automatically
});

UserSchemaMethod(UserSchema); // Add password hashing and comparison methods

module.exports = mongoose.model("User", UserSchema); // Export the User model
