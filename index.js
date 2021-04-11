const path = require('path');
const express = require('express');

const app = express();
app.use(express.static('pages'));

app.get('/' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/home/index.html'))

})

app.get('/logIn' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/logIn/logIn.html'))
    
})

app.get('/signIn' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/signIn/signIn.html'))
    
})

app.get('/logIn/forgotPass' , (req , res ) =>{

    res.sendFile(path.join(__dirname+'/pages/forgotPass/forgotPass.html'))
    
})

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}`));