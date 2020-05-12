var _ = require('lodash');
var jwt = require('jsonwebtoken');

function auth(req, res, next) {
    var token;
    if (req.headers['authorization']) {
        var authString = req.headers['authorization'];
        var authStringParam = _.compact(authString.split(' '));
        if (authStringParam.length != 2) {
            return res.status(401).send("Access denied");
        }
        token = authStringParam[1];
    } else {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        var user = jwt.verify(token, 'secretkey');
        if (user) {
            if (user.roles.includes('user')) {
                req.user = user;
                req.userId = user._id;
                return next();
            } else {
                return res.status(401).send("Access denied");
            }
        }
        return res.status(401).send("Access denied");
    } catch (err) {
        console.log("ERROR while login", err);
        return res.status(401).send("Access denied");
    }
}

module.exports = {
    auth
}