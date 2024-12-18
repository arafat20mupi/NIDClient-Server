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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0, 
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
}, {
  timestamps: true, // Add createdAt and updatedAt fields automatically
});

UserSchemaMethod(UserSchema); // Add password hashing and comparison methods

module.exports = mongoose.model("User", UserSchema); // Export the User model
