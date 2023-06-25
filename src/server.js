'use strict';
require('dotenv').config();
const express = require('express');
const basic = require('./auth/middleware/basicAuth');
const bearer = require('./auth/middleware/bearerAuth');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const acl=require('./auth/middleware/acl')
const bcrypt = require('bcrypt');
const users = require('./auth/models/users.model');
const app = express();
app.use(express.json());


app.post('/signup', async (req, res) => {
    //let username = req.body.username;
    let hashedPassword = await bcrypt.hash(req.body.password, 5);
    const record = await users.create({
        username: req.body.username,
        password: hashedPassword,
        role:req.body.role,
    });
    res.status(201).json(record);
});
app.post('/signin', basic, loginHandler);

app.get('/secretstuff', bearer, secretstuffHandler)


app.get('/img',bearer,acl('read'),imageHandler)
app.post('/img',bearer,acl('create'))
app.put('/img',bearer,acl('update'))
app.delete('/img',bearer,acl('delete'),imageDeleteHandler)

function imageHandler(req, res) {
    res.status(200).json('you have the access');

}
function imageDeleteHandler(req, res) {
    res.status(200).json('you have the access');

}









function loginHandler(req, res) {
    res.status(200).json(req.user);


}
//app.use('*', notFoundHandler);
//app.use(errorHandler)
function secretstuffHandler(req, res) {
    res.status(200).json({
        'message': 'can view this route',
        'user': req.user
    });
}

module.exports = app;