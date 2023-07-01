'use strict';
//require('dotenv').config();
const express = require('express');
const basic = require('./middleware/basicAuth');
const bearer = require('./middleware/bearerAuth');
const acl=require('./middleware/acl')
const bcrypt = require('bcrypt');
const {users} = require('./models/users.model');
const authRouter = express.Router();


//routes
authRouter.post('/signup', basic, signupHandler);
authRouter.post('/signin', basic, signinHandler);
authRouter.delete('/users',bearer,acl('delete'),userDeleteHandler)
authRouter.get('/secret',bearer,secretHandler)




//handlers
async function signupHandler(req, res) {
    let hashedPassword = await bcrypt.hash(req.body.password, 5);
    const record = await users.create({
        username: req.body.username,
        password: hashedPassword,
        role:req.body.role,
    });
    res.status(201).json(record);
};

function signinHandler(req, res) {
    res.status(200).json(req.user);


}
 async function userDeleteHandler (req, res, next) {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  };
  
  async function secretHandler(req, res, next){
    res.status(200).send('Welcome to the secret area')
  };


module.exports = authRouter;