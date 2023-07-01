'use strict';
const express = require('express');
const dataModules = require('../models/index');
const v2Routes = express.Router();
const bearer = require('../auth/middleware/bearerAuth');
const acl = require('../auth/middleware/acl');


v2Routes.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});
v2Routes.get('/api/v2/:model', bearer, v2Handler);
v2Routes.get('/api/v2/:model/:id', bearer, v2Handleer);
v2Routes.post('/api/v2/:model', bearer, acl('create'),v2CreateHandler);
v2Routes.put('/api/v2/:model/:id', bearer, acl('update'),v2UpdateHander);
v2Routes.delete('/api/v2/:model/:id', bearer, acl('delete'), v2DeleteHandler);


async function v2Handler(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function v2Handleer(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function v2CreateHandler(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function v2UpdateHander(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function v2DeleteHandler(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}




module.exports = v2Routes;
