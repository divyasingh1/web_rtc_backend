var express = require('express');
var app = express();
var db = require('./db');

var userContoller = require('./contoller/UserController');
app.use('/api', userContoller);

//routes

module.exports = app;