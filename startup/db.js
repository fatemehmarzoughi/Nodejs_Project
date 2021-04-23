const config = require('config');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(config.get('mongodb'))
     .then(() => console.log('connect'))
     .catch((err) => console.log(err));
}