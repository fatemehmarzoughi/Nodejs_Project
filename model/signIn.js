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
        maxlength : 20,  
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

const Users = mongoose.model('users' , usersSchema);


const userValidation = (input) => {
    const schema = {
        name : Joi.string().required(),
        username : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(5).max(20).required(),
        rewritePassword : Joi.string().min(5).max(20).required(),
        email : Joi.string().email().required(),
        phone : Joi.number().required(),
    }

    return Joi.validate(input , schema);
}

module.exports.userValidation = userValidation;
module.exports.Users = Users;