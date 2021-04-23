const fetch = require('cross-fetch');

try
{
    const header = new fetch.Headers();

    header.append('authToken')
    header.append('foundedProductId')
    header.append('forgotPassCode')
    module.exports = header;
}

catch(err) { console.log(err) }
    