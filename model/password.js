const Joi = require('joi');

const validatePass = (input) => {
    const schema= {
        password : Joi.string().min(5).max(100).required(),
    }

    const userInput = {
        password : input.password,
    }

    return Joi.validate(userInput , schema);
}

module.exports = validatePass;