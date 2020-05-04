var User = require('./User');
var Promise = require('bluebird');
const { v4: uuidv4 } = require('uuid');

class UserModel {
    constructor() {
    }

    findById(id) {
        return new Promise(function (resolve, reject) {
            User.findById(id, function (err, user) {
                if (err) {
                    return reject("Error in finding user");
                }
                if (!user) {
                    return reject("user not found");
                }
                return resolve(user)
            });
        });
    }

    findByEmail(email) {
        return new Promise(function (resolve, reject) {
            User.findOne({email: email}, function (err, user) {
                if (err) {
                    return reject("Error in finding user");
                }
                if (!user) {
                    return reject("user not found");
                }
                return resolve(user)
            });
        });
    }

    createUser(details) {
        details._id = uuidv4();
        console.log(">>createUser", details)
        return new Promise(function (resolve, reject) {
            return User.create(details, function (err, user) {
                if (err) {
                    return reject("Error in creating user");
                }
                return resolve(user)
            });
        });
    }
}

module.exports = UserModel;