'use strict';
require('dotenv').config();
const port = process.env.PORT;
const server = require('./src/server');
const { db } = require('./src/models/index');

db.sync()
    .then(() => {
        server.listen(port, () => {
            console.log(`server up on port ${port}`)
        })
    })