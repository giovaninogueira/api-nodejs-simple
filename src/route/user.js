'use strict';

const UserController = require("../app/controller/UserController");

const express = global.express;
const routers = express.Router();

routers.post('/', UserController.store); // Insert User

module.exports = routers;