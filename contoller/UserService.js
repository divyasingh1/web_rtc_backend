var UserModel = require('./UserModel');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

class UserService {
    constructor() {
    }

    createUser(details) {
        //TODO Error handling
        return this.encryptString(details.password)
            .then((encyptedPassword) => {
                details.password = encyptedPassword;
                var userModelInst = new UserModel();
                return userModelInst.createUser(details)
            })
            .then((user) => {
                return this.createSession(user);
            })
            .then((sessionData) => {
                return sessionData.token;
            })
    }

    encryptString(password) {
        return new Promise((resolve, reject) => {
            return bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.log("ERROR in bcypt", err);
                    return reject(err);
                }
                return bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log("ERROR in bcypt", err);
                        return reject(err);
                    }
                    return resolve(hash)
                });
            });
        });
    }

    async createSession(user) {
        var sessionId = await this.saveUserSession(user._id, {
            email: user.email
        });
        var token = await this.jwtEncode({
            _id: user._id,
            sessionId,
            roles: ['user']
        });
        return {
            token,
            sessionId
        };
    }

    saveUserSession() {
        return Promise.resolve();//TODO
    }

    jwtEncode(data) {
        return Promise.resolve(jwt.sign(data, "secretkey").toString());
    }

    loginUser({email, password}){
        let user;
        email = email.toLocaleLowerCase();
        return this.findByEmail(email)
        .then((u)=>{
            if(!u){
                return Promise.reject();
            }
            user = u;
            return this.compareEncryptString(password, user.password);
        })
        .then((passwordMatched)=>{
            if(!passwordMatched){
                return Promise.reject();
            }
            return Promise.resolve(passwordMatched);
        })
        .then(()=>{
            return this.createNewSession(user);
        })
        .then((sessionData)=>{
            return Promise.resolve({
                userId: user._id,
                token: sessionData.token,
                email: user.email,
                roles: user.roles
            });
        });
    }

    async createNewSession(user){
        var token =  await this.jwtEncode({
            _id: user._id,
            roles : user.roles || ['user']
            // sessionId 
        })
        return {
            token,
            // sessionId
        }
    }

    findByEmail(email){
        var userModelInst = new UserModel();
        return userModelInst.findByEmail(email);
    }

    compareEncryptString(string = '', hashString = ''){
        return new Promise((resolve, reject)=>{
            bcrypt.compare(string, hashString, function(err, result) {
                if(err){
                    return reject();
                }
                return resolve(result);
            });
        });
    }
}


module.exports = UserService;
