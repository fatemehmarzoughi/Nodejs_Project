const fetch = require('cross-fetch');
const header = new fetch.Headers();
header.append('authToken');


module.exports = header;