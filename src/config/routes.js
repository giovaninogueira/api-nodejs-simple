'use strict';

const express = global.express;
const app = express();

const UserController = require("../app/controller/UserController");

app.post('/login', UserController.login);
app.use('/user', require('../route/user'));

module.exports = app;