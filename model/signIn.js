const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi')

const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    username : {
        type : String,
        maxlength : 20,
        minlength : 5,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 100,  
    },
    email : {
        type : String,
        required : true,

    },
    phone : {
        type : Number,
        required : true,
    },
})

usersSchema.methods.generateAuthToken = function(){
    return jwt.sign({username : this.username} , '1234'); //create the token
}

const Users = mongoose.model('users' , usersSchema);


const userValidation = (input) => {
    const schema = {
        name : Joi.string().required(),
        username : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(5).max(100).required(),
        rewritePassword : Joi.string().min(5).max(20).required(),
        email : Joi.string().email().required(),
        phone : Joi.number().required(),
    }

    return Joi.validate(input , schema);
}



module.exports.userValidation = userValidation;
module.exports.Users = Users;