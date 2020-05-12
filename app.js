var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var {auth} = require('./auth_middleware/auth')
var db = require('./db');

var userContoller = require('./contoller/UserController');
var authContoller = require('./contoller/AuthController');

app.use('/api', userContoller);
app.use(auth);
app.use('/api/user', authContoller);


module.exports = app;