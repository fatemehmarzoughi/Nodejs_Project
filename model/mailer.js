const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'myshopnodejsproject@gmail.com',
        pass : 'myShop123',
    }
})

module.exports = transport;