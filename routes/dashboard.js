const path = require('path');
const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();

router.get('/' , auth , (req , res) => {
    res.sendFile(path.join(__dirname , '/pages/dashboard/dashboard.html'));
    console.log('dashboard');
})

module.exports = router;