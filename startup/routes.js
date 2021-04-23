const express = require('express');
const dashboardAdmin = require('../routes/dashboardAdmin');
const dashboard = require('../routes/dashboard');
const signIn = require('../routes/signIn');
const logIn = require('../routes/logIn');
const home = require('../routes/home');
const error = require('../middleware/error');

module.exports = function (app) {

    //for accessing to the req
    app.use(express.json());

    //for accessing to the static files
    app.use(express.static('pages'));
        
    //to send data from express to pug
    app.set('view engine', 'pug');

    //for accessing to the form fields
    app.use(express.urlencoded({
        extended : true,
    }));

    //routes
    app.use('/' , home);
    app.use('/signIn' , signIn);
    app.use('/logIn' , logIn);
    app.use('/dashboard' , dashboard);
    app.use('/dashboardAdmin' , dashboardAdmin);
    
    //after all the middlewares (catch error middleware)
    app.use(error)
}
