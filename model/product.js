const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name : {
        type : String,
        maxlength : 100,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    }
})

const Product = mongoose.model('product' , productSchema);


const productValidation = (input) => {
    const schema = {
        name : Joi.string().max(100).required(),
        price : Joi.number().required(),
    }

    const userInput = {
        name : input.name,
        price : input.price,
    }

    return Joi.validate(userInput , schema);
}

module.exports.Product = Product;
module.exports.productValidation = productValidation;