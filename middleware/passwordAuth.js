const jwt = require('jsonwebtoken');
const header = require('../model/headers')

const passwordAuth = (req , res , next) => {

    const token = header.get('forgotPassCode');
    if(!token) res.status(401).send('Access denied!');

    try
    {
        const decoded = jwt.verify(token , '1234'); //config
        req.body.code = decoded.code;
        req.body.username = decoded.username;
        next();
    }

    catch(err) { 
        res.status(401).send('invalid token')
    }
}

module.exports = passwordAuth;