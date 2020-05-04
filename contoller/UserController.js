var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserService = require('./UserService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var UserModel = require('./UserModel');

//signup
router.post('/signup', function (req, res) {
    var userServiceInst = new UserService();
    return userServiceInst.createUser(req.body)
        .then((token) => {
            res.status(200).send({ "status": "SUCCESS", "token": token });
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" });
        });
});

//login
router.post('/login', function (req, res) {
    var userServiceInst = new UserService();
    return userServiceInst.loginUser(req.body)
        .then((sessionData) => {
            res.status(200).send(sessionData);
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" });
        });
});

module.exports = router;