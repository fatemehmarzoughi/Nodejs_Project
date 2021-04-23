const { handleError } = require('../middleware/errorHandler');
const { Product } = require('../model/product');
const express = require('express');
const router = express.Router();
const path = require('path');
 
router.get('/' , handleError( async (req , res) =>{
    const product = await Product.find();
    res.render(path.join(__dirname + '/../pages/home/index.pug') , {
        newProduct :  product,
    })
}))

module.exports = router;
