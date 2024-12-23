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
  timestamps: true,
});

UserSchemaMethod(UserSchema);

module.exports = mongoose.model("User", UserSchema); 
