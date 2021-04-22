const fetch = require('cross-fetch');

const header = new fetch.Headers();

header.append('authToken')
header.append('foundedProductId')
header.append('forgotPassCode')
    
module.exports = header;