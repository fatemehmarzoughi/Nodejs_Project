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

    console.log('first part')
    
    //get values from the user
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    //check user's inputs validation
    const error = validation(req.body);
    if(error) return res.status(400).send(error.details[0].message); 
    console.log('third part')

    //search for the entered username in the db
    const user = await Users.findOne({username});
    if(!user) return res.status(400).send('user not found');
    console.log('fourth part')

    //check if the password is valid or not(dehash)
    const validPass = await bcrypt.compare(password , user.password);
    if(!validPass) return res.status(400).send('wrong password');
    console.log('fifth part');

    //generate the token and send it to the header
    const token = user.generateAuthToken();
    res.header('x-auth-token' , token).send(user.username);

    //send the user's dashboard
    // res.redirect();
})

module.exports = router;
