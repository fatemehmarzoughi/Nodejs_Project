const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req , res , next) {
    const token = req.params.token;
    if(!token) return res.status(401).send('Access denied');

    try{
        const decoded = jwt.verify(token , '1234' ); //config.get('jwtPrivateKey')
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send('invalid token');
    }
}

module.exports = auth;