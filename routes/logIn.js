const { Product } = require('../model/product');
const transport = require('../model/mailer');
const auth = require('../middleware/auth')
const passwordAuth = require('../middleware/passwordAuth')
const validatePass = require('../model/password');
const jwt = require('jsonwebtoken');
const validation = require('../model/logIn');
const random = require('random');
const header = require('../model/headers');
const bcrypt = require('bcrypt');
const {Users} = require('../model/user');
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/' , (req , res ) =>{

    res.render(path.join(__dirname+'/../pages/logIn/logIn.pug'))
    
})

router.get('/forgotPass' , (req , res ) =>{

    res.render(path.join(__dirname+'/../pages/forgotPass/forgotPass.pug'))
    
})

router.post('/forgotPass/send' , async (req , res) => {
    const username = req.body.username;

    //search in db and check if the user exists or not
    const user = await Users.findOne({ username });
    if(!user) return res.render(path.join(__dirname + '/../pages/forgotPass/forgotPass.pug') , {
        errorMessage : 'This username doesnt exist',
    })

    //generate a code to be send to email address 
    const code = random.int((min = 1000) , (max = 5000));
    const token = jwt.sign({ code , username } , '1234'); //config.get('jwtPrivateKey')
    header.set('forgotPassCode' , token , {
        expiresIn : '2h',
    });

    //send the email
    var mailContent = {
        from : 'fatemeh.marzoughi18@gmail.com',
        to : user.email,
        subject : 'forgot password',
        text : `Your Code : ${code}`
    }

    transport.sendMail(mailContent , (err , info) => {
        if(err) return res.render(path.join(__dirname + '/../pages/forgotPass/forgotPass.pug') , {
            errorMessage : 'something went wrong please try again.'
        })
        
        return res.render(path.join(__dirname + '/../pages/emailVerify/emailVerify.pug'));
    })

})

router.post('/forgotPass/send/verify' , (req , res) => {

    const codeToken = header.get('forgotPassCode');
    const decoded = jwt.verify(codeToken , '1234');

    if(req.body.code == decoded.code)
        return res.render(path.join(__dirname + '/../pages/generatePass/generatePass.pug'));

    else return res.render(path.join(__dirname + '/../pages/emailVerify/emailVerify.pug') , {
        errorMessage : 'The Code is invalid',
    })

})

router.post('/forgotPass/send/verify/generate' , passwordAuth, async (req , res) => {

    if(req.body.password !== req.body.rewritePassword)
      return res.render(path.join(__dirname + '/../pages/generatePass/generatePass.pug') , {
          errorMessage : 'passwords dont match',
      })

    const result = validatePass(req.body);
    if(result.error) return res.render(path.join(__dirname + '/../pages/generatePass/generatePass.pug') , {
        errorMessage : result.error.details[0].message,
    })

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password , salt);

    await Users.updateOne({ username : req.body.username } , {
        $set : {
            password : hashedPass,
        }
    } , {new : true});

    res.render(path.join(__dirname + '/../pages/logIn/logIn.pug') , {
        errorMessages : 'password changed successfuly',
    })

})

router.post('/submit' , async (req , res) => {

    //get values from the user
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    //check user's inputs validation
    const error = validation(req.body);
    if(error) return res.render(path.join(__dirname + '/../pages/logIn/logIn.pug') , {
        errorMessages : error.details[0].message,
    })

    //search for the entered username in the db
    const user = await Users.findOne({username});
    if(!user) return res.render(path.join(__dirname + '/../pages/logIn/logIn.pug') , {
        errorMessages : 'user not found',
    })

    //check if the password is valid or not(dehash)
    const validPass = await bcrypt.compare(password , user.password);
    if(!validPass) return res.render(path.join(__dirname + '/../pages/logIn/logIn.pug') , {
        errorMessages : 'wrong password',
    })
    
    //generate the token and send it to the header        
    const token = user.generateAuthToken();
    header.set('authToken' , token);

    
    //check if the user is admin or not and returnn diffrent dashboards for admins and normal users
    if(user.isAdmin) 
    {
        //send the admin's dashboard
        res.redirect(`/dashboardAdmin`);
    }
    else
    {
        //send the user's dashboard
        res.redirect(`/dashboard`);
    }

})

router.get('/buy/:id' , auth, async (req , res) => {

    const user = await Users.findOne({ _id : req.user._id })
    if(!user) return res.status(401).send('sth went wrong');
    
    const _id = req.params.id;
    console.log(_id);
    const product = await Product.findById({ _id })
    if(!product) return res.status(401).send('invalid id');
    console.log(product);
    //insert the product to the user's card
    const result = await user.boughtProducts.push(product);
    if(!result) return res.status(401).send('sth went wrong');

    const products = user.boughtProducts;
    res.render(path.join(__dirname + '/../pages/dashboard/dashboard.pug') , {
        myCard : products,
    })

})

module.exports = router;
