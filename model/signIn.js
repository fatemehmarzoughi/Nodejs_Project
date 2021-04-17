const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi')
const config = require('config')

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
    isAdmin : {
        type : Boolean,
        required : true,
    }
})

usersSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id : this._id} , '1234' , { //config.get('jwtPrivateKey')
        expiresIn :  '2h' // expires in 24 hours
    }); //create the token
}

const Users = mongoose.model('users' , usersSchema);


const userValidation = (input) => {
    const schema = {
        name : Joi.string().required(),
        username : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(5).max(100).required(),
        email : Joi.string().email().required(),
        phone : Joi.number().required(),
        isAdmin : Joi.boolean().required(),
    }

    const userInput = {
        name : input.name,
        username : input.username,
        password : input.password,
        email : input.email,
        phone : input.phone,
        isAdmin : input.isAdmin,
    }

    return Joi.validate(userInput , schema);
}



module.exports.userValidation = userValidation;
module.exports.Users = Users;