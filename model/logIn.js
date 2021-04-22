const Joi = require('joi');

const validation = (input) => {
    const schema = {
        username : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(5).max(100).required(),
    }
    const userInput = {
        username : input.username,
        password : input.password,
    }
    
    const result = Joi.validate(userInput , schema);
    return result.error;
}

module.exports = validation