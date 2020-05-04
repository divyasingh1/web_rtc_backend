var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    email:{
        type: String,
        // require: true
    },
    firstName:{
        type: String,
        // require: true
    },
    lastName:{
        type: String,
        // require: true
    },
    role:{
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        required: true,
        default: ['user']
    },
    password:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

mongoose.model('users',UserSchema);

module.exports = mongoose.model('users');