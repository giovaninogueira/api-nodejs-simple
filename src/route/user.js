'use strict';

const UserController = require("../app/controller/UserController");
const User = require("../app/schema/User");

const express = global.express;
const routers = express.Router();

routers.post('/', UserController.store); // Insert User
routers.put('/', global.appObj.verifyToken, UserController.update); // Update User

module.exports = routers;