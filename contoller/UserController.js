var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserService = require('./UserService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//test
router.post('/test', function (req, res) {
    res.send({ "status": "SUCCESS"});
});

//signup
router.post('/signup', function (req, res) {
    var userServiceInst = new UserService();
    req.body.email = req.body.username;
    return userServiceInst.createUser(req.body)
        .then((token) => {
            res.send({ "status": "SUCCESS", "token": token });
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" });
        });
});

//login
router.post('/authenticate', function (req, res) {
    var userServiceInst = new UserService();
    req.body.email = req.body.username;
    return userServiceInst.loginUser(req.body)
        .then((sessionData) => {
            res.send(sessionData);
        })
        .catch((err) => {
            res.status(401).send({ status: "Failed" });
        });
});

module.exports = router;