'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//const basic = require('./auth/middleware/basicAuth');
//const bearer = require('./auth/middleware/bearerAuth');
//const acl = require('./auth/middleware/acl')
//const bcrypt = require('bcrypt');
//const users = require('./auth/models/users.model');
const authRoutes = require('./auth/routes');
const app = express();
app.use(express.json());
const logger = require('./middleware/logger');

app.use(logger);
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

app.use(authRoutes);
app.use(v1Routes);
app.use( v2Routes);

app.get("/",(req,res)=>{
    res.send("HELLO!")
  })
// function secretstuffHandler(req, res) {
//     res.status(200).json({
//         'message': 'can view this route',
//         'user': req.user
//     });
// }
// app.get('/img',bearer,acl('read'),imageHandler)
// app.post('/img',bearer,acl('create'))
// app.put('/img',bearer,acl('update'))
// app.delete('/img',bearer,acl('delete'),imageDeleteHandler)

// function imageHandler(req, res) {
//     res.status(200).json('you have the access');

// }
// function imageDeleteHandler(req, res) {
//     res.status(200).json('you have the access');

// }
app.use('*', notFoundHandler);
app.use(errorHandler)

module.exports = app;