const header = require('../model/headers');
const mongoose = require('mongoose');
const auth = require('../middleware/auth')
const { productValidation , Product } = require('../model/product');
const path = require('path')
const express = require('express');
const route = express.Router();


route.get('/' , auth, (req , res) => {
    res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
        header : 'admin dashboard'
    });
})

route.post('/addProduct' ,auth, async (req , res) => {
    let name = req.body.name;
    let price = req.body.price;

    //checks the validation of the inputs
    const result = productValidation(req.body);
    if(result.error) res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
        errorMessages : result.error.details[0].message,
    })

    //add the product
    const user = await new Product({
        name ,
        price,
    })
    await user.save();

    res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
        successMessages : 'the product added succefuly',
    })
})

route.post('/find' ,auth , async (req , res) => {

    // check the id validation
    const result = await mongoose.Types.ObjectId.isValid(req.body.productId);
    if(!result) res.render(path.join(__dirname + "/../pages/dashboardAdmin/dashboardAdmin.pug") , {
        errorMessageDelete : 'invalid id number!',
    });

    //check if the id exists or not
    const product = await Product.findById(req.body.productId);
    if(!product) res.render(path.join(__dirname + "/../pages/dashboardAdmin/dashboardAdmin.pug") , {
        errorMessageDelete : 'product not found!',
    })

    header.set('foundedProductId' , await product._id);

    if(req.body.submit === 'delete')
    {
        res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
            display : 'display : block',
            name : product.name,
            price : product.price,
            id : product._id,
        })
    }
    else
    {
        res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
            displayUpdate : 'display : block',
            nameUpdate : product.name,
            priceUpdate : product.price,
            idUpdate : product._id,
        })
    }

})

route.post('/find/deleteProduct' , async (req , res) => {
    if(req.body.submit === 'Yes')
    {
       await Product.deleteOne({_id : header.get('foundedProductId')});
       res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
          display : 'display : none',
          successMessageDelete : 'the product deleted successfully'
       })
    }
    else
    {
        res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
            display : 'display : none',
        })
    }
})

route.post('/find/updateProduct' , async (req , res) => {

    if(req.body.submit === 'update')
    {
        const foundedId = await header.get('foundedProductId');

        //check the input validation
        const result = productValidation(req.body);
        if(result.error) res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
            errorMessageUpdate : 'invalid inputs',
        })

        await Product.updateOne({_id : foundedId} , {
            $set : {
                name : req.body.name,
                price : req.body.price,
            }
        }, {new : true});

        res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
            successMessageUpdate : 'updated successfuly',
            // displayUpdate : 'display : none',
        })        
    }
    else
    {
        res.render(path.join(__dirname + '/../pages/dashboardAdmin/dashboardAdmin.pug') , {
            errorMessageUpdate : 'canceled',
            // displayUpdate : 'display : none',
        })
    }
})

module.exports = route;