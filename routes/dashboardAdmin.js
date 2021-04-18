const mongoose = require('mongoose');
const auth = require('../middleware/auth')
const { productValidation , Product } = require('../model/product');
const path = require('path')
const express = require('express');
const route = express.Router();


route.get('/' , auth, (req , res) => {
    res.render(path.join(__dirname + '/pages/dashboardAdmin/dashboardAdmin.pug') , {
        header : 'admin dashboard'
    });
})

route.post('/addProduct' ,auth, async (req , res) => {
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

route.get('/find' ,auth , async (req , res) => {
    console.log(req.body);
    // check the id validation
    const result = await mongoose.Types.ObjectId.isValid(req.body.productId);
    if(!result) res.render(path.join(__dirname + "/pages/dashboardAdmin/dashboardAdmin.pug") , {
        errorMessageDelete : 'invalid id number!',
    });
    console.log(req.body.productId)

    //check if the id exists or not
    const product = await Product.findById(req.body.productId);
    if(!product) res.render(path.join(__dirname + "/pages/dashboardAdmin/dashboardAdmin.pug") , {
        errorMessageDelete : 'product not found!',
    })
    console.log(req.body.productId)

    res.render(path.join(__dirname + '/pages/dashboardAdmin/dashboardAdmin.pug') , {
        display : 'block',
        name : product.name,
        price : product.price,
        id : product._id,
    })

})

route.delete('/deleteProduct' , (req , res) => {
    
})

module.exports = route;