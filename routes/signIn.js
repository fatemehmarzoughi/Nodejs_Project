const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const path = require('path');
const {Users , userValidation} = require('../model/signIn');


router.get('/' , (req , res ) =>{
    //the content of the page
    res.render(path.join(__dirname + '/pages/signIn/signIn.pug') , {});
})

router.post('/submit' , async (req , res ) => {

    //get values
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let rewritePassword = req.body.rewritePassword;
    let email = req.body.email;
    let phone = req.body.phone;
    let isAdmin = (req.body.isAdmin == undefined) ? false : true;

    console.log(`isAdmin = ${isAdmin}`);
    //check if the password field matches the repeat password field or not
    if(password != rewritePassword) return res.render(path.join(__dirname+'/pages/signIn/signIn.pug') , {
        errorMessages : 'passwords not match',
    });

    //check their validation
    const result = userValidation(req.body);
    if (result.error) return res.render(path.join(__dirname+'/pages/signIn/signIn.pug') , {
        errorMessages : result.error.details[0].message,
    });

    //check if the user has login before or not
    let user = await Users
            .findOne({username});
    if(user) return res.render(path.join(__dirname+'/pages/signIn/signIn.pug') , {
        errorMessages : 'This username already exists',
    });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password , salt);

    //insert to the db
    user = await new Users({
        name ,
        username ,
        email ,
        password : hash ,
        phone ,
        isAdmin,
    });

    await user.save();

    //take the users to the login page
    res.redirect('/logIn')
})

module.exports = router;