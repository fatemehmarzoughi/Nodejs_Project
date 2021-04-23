const { handleError } = require('../middleware/errorHandler');
const { Users } = require('../model/user');
const path = require('path');
const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();

router.get('/' , auth , handleError(async (req , res) => {

    const { _id } = req.user;
    const user = await Users.findById(_id);
    const products = user.boughtProducts;

    res.render(path.join(__dirname , '/../pages/dashboard/dashboard.pug') , {
        title : 'hello',
        header : `welcome ${user.name}`,
        myCard : products,
    })

}))

module.exports = router;