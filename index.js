const Joi = require('joi');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.static('pages'));
//for accessing to the form fields
app.use(express.urlencoded({
    extended: true
  }))

app.get('/' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/home/index.html'))

})

app.get('/logIn' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/logIn/logIn.html'))
    
})

app.get('/signIn' , (req , res ) =>{
    //the content of the page
    res.sendFile(path.join(__dirname+'/pages/signIn/signIn.html'))

})

app.post('/signIn/submit' , (req , res ) => {

    //check if the password field matches the repeat password field or not
    if(req.body.password != req.body.rewritePassword) return res.send('passwords does not match!');

    //check their validation
    const schema = {
        name : Joi.string().required(),
        username : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(5).max(20).required(),
        email : Joi.string().email().required(),
        phone : Joi.number().required(),
    }

    const result = Joi.validate(req.body , schema);

    if(result.error)
    {
        res.sendFile(path.join(__dirname+'/pages/signIn/signIn.html'))
        res.status(400).send(result.error.details[0].message);
        return;    
    }

    //check if the user has login before or not

    //insert to the db
})

app.get('/logIn/forgotPass' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/forgotPass/forgotPass.html'))
    
})

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}`));




