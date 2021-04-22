const header = require('../model/headers');
const jwt = require('jsonwebtoken');
const config = require('config');
const path = require('path');

function auth(req , res , next) {
    
    const token = header.get('authToken');

    if(!token) return res.render(path.join(__dirname + '/../pages/logIn/logIn.pug'));

    try{
        const decoded = jwt.verify(token , '1234' ); //config.get('jwtPrivateKey')
        req.user = decoded;
        next();
    }
    catch(err){
        return res.render(path.join(__dirname + '/../pages/logIn/logIn.pug'))
        // res.status(400).send('invalid token');
    }
}

module.exports = auth;