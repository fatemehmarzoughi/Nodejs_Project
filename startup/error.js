const winston = require('winston');

module.exports = function () {
    process.on('uncaughtException' , (err) => {
        console.log('uncaught exeption');
        winston.log('error' , err.message , err)
    });
    
    winston.add(winston.transports.File, {
        filename : 'logfile.log',
        level : 'error'
    });
}
