const express = require('express');
const router = express.Router();
const path = require('path');
const {Users , userValidation} = require('../model/signIn');


router.get('/' , (req , res ) =>{
    //the content of the page
    res.sendFile(path.join(__dirname+'/pages/signIn/signIn.html'))

})

router.post('/submit' , async (req , res ) => {

    //get values
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let rewritePassword = req.body.rewritePassword;
    let email = req.body.email;
    let phone = req.body.phone;

    //check if the password field matches the repeat password field or not
    if(password != rewritePassword) return res.send('passwords does not match!');

    //check their validation
    const result = userValidation();
    if (result.error) res.status(400).send(result.error.details[0].message);

    //check if the user has login before or not
    let user = await Users
            .findOne({username});
    if(user) return res.status(400).send('username already exists');

    //hash the password

    //insert to the db
    user = await new Users({
        name ,
        username ,
        email ,
        password ,
        phone ,
    });

    await user.save();

    res.sendFile(path.join(__dirname+'/pages/dashboard/dashboard.html'));

})

module.exports = router;