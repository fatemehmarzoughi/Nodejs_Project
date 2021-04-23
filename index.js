require('express-async-errors');
const express = require('express');
const app = express();


require('./startup/error')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/production')(app);
// require('./startup/config')();


const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}`));