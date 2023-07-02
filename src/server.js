'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const authRoutes = require('./auth/routes');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

app.use(authRoutes);
app.use(v1Routes);
app.use(v2Routes);


app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi from home rout ');
}

app.use(logger);
// app.use(notFoundHandler);
// app.use(errorHandler);
// app.use(authRoutes);
// app.use(v1Routes);
// app.use(v2Routes);


app.use('*', notFoundHandler);
app.use(errorHandler);



module.exports = {
  server: app, 
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};













