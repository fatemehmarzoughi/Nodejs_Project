const mongoose = require('mongoose');
const { Product } = require('../model/product');
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/' , async (req , res ) =>{

    const product = await Product.find();

    res.render(path.join(__dirname + '/pages/home/index.pug') , {
        newProduct :  `${product[0].name} , ${product[0].price}`
    })
})

module.exports = router;
