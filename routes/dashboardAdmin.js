const { productValidation , Product } = require('../model/product');
const path = require('path')
const express = require('express');
const route = express.Router();


route.get('/:id' , (req , res) => {
    res.render(path.join(__dirname + '/pages/dashboardAdmin/dashboardAdmin.pug') , {
        header : 'admin dashboard'
    });
})

route.post('/:id/addProduct' , async (req , res) => {
    let name = req.body.name;
    let price = req.body.price;

    //checks the validation of the inputs
    const result = productValidation(req.body);
    if(result.error) res.render(path.join(__dirname + '/pages/dashboardAdmin/dashboardAdmin.pug') , {
        errorMessages : result.error.details[0].message,
    })

    //add the product
    const user = await new Product({
        name ,
        price,
    })
    await user.save();

    res.render(path.join(__dirname + '/pages/dashboardAdmin/dashboardAdmin.pug') , {
        errorMessages : 'the product added succefuly',
    })
})

module.exports = route;