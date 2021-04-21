const { Users } = require('../model/user');
const path = require('path');
const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();

router.get('/' , auth , async (req , res) => {

    const { _id } = req.user;
    const user = await Users.findById(_id);
    
    // use ajax to send data from express to html

    res.render(path.join(__dirname , '/pages/dashboard/dashboard.pug') , {
        title : 'hello',
        header : `welcome ${user.name}`,
    })
    // res.sendFile(path.join(__dirname , '/pages/dashboard/dashboard.html'));

})

module.exports = router;