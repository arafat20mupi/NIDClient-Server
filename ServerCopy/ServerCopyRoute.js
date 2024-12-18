// UserRoutes.js
const express = require("express");
const { PostServer, GetAllServers } = require("./ServerCopyController")

const route = express.Router();

route.post('/serverCopy' , PostServer)

route.get('/serverCopy', GetAllServers)

module.exports = route;



module.exports = route;
