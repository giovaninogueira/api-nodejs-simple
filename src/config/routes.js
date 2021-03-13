'use strict';

const express = global.express;
const app = express();

app.use('/user', require('../route/user'));

module.exports = app;