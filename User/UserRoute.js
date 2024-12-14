// UserRoutes.js
const express = require("express");
const { register, login,getAll , loginUser} = require("./UserController");
const { authMiddleware } = require("../Middleware/Middleware");

const route = express.Router();

// Register Route
route.post("/register", register);

//  login Route
route.post('/login', login)

// Login User Route

route.get('/loginUser', loginUser) 

// Get All Users Route

route.get('/users', getAll)

module.exports = route;



module.exports = route;
