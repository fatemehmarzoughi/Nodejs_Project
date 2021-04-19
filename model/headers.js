const fetch = require('cross-fetch');

// async function setHeader() {
    const header = new fetch.Headers();
    header.append('authToken');
    header.append('deletedProductId');
// }


module.exports = header;