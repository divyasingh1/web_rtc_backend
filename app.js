var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var db = require('./db');

var userContoller = require('./contoller/UserController');
app.use('/api', userContoller);

//routes

module.exports = app;