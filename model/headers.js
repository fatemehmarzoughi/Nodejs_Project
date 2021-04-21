const fetch = require('cross-fetch');

const header = new fetch.Headers();

header.append('authToken')
header.append('foundedProductId')
    
module.exports = header;