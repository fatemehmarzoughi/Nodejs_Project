const dashboard = require('./routes/dashboard');
const signIn = require('./routes/signIn');
const logIn = require('./routes/logIn');
const home = require('./routes/home');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//for accessing to the static files
app.use(express.static('routes'));

//for accessing to the form fields
app.use(express.urlencoded({
    extended : true,
}));

//for accessing to the req
app.use(express.json());

//to send data from express to pug
app.set('view engine', 'pug');

app.use('/' , home);
app.use('/signIn' , signIn);
app.use('/logIn' , logIn);
app.use('/dashboard' , dashboard);

mongoose.connect('mongodb://localhost/users')
     .then(() => console.log('connect'))
     .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}`));