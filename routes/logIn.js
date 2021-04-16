const Joi = require('joi');
const bcrypt = require('bcrypt');
const {Users} = require('../model/signIn')
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/logIn/logIn.html'))
    
})


router.get('/forgotPass' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/forgotPass/forgotPass.html'))
    
})

const validation = (input) => {
    const schema = {
        username : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(5).max(100).required(),
    }
    const userInput = {
        username : input.username,
        password : input.password,
    }
    
    const result = Joi.validate(userInput , schema);
    return result.error;
}

router.post('/submit' , async (req , res) => {

    //get values from the user
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    //check user's inputs validation
    const error = validation(req.body);
    if(error) return res.render(path.join(__dirname + '/pages/logIn/logIn.pug') , {
        errorMessages : error.details[0].message,
    })

    //search for the entered username in the db
    const user = await Users.findOne({username});
    if(!user) return res.render(path.join(__dirname + '/pages/logIn/logIn.pug') , {
        errorMessages : 'user not found',
    })

    //check if the password is valid or not(dehash)
    const validPass = await bcrypt.compare(password , user.password);
    if(!validPass) return res.render(path.join(__dirname + '/pages/logIn/logIn.pug') , {
        errorMessages : 'wrong password',
    })

    //generate the token and send it to the header
    const token = user.generateAuthToken();

    //send the user's dashboard
    res.redirect(`/dashboard/${token}`);
})

module.exports = router;
