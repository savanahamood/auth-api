'use strict';

const express = require('express');
const dataModules = require('../../src/auth/models/index');
const v1Routes = express.Router();


v1Routes.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];//(sequelize, DataTypes);
    next();
  } else {
    next('Invalid Model');
  }
});

v1Routes.get('/api/v1/:model', handleGetAll);
v1Routes.get('/api/v1/:model/:id', handleGetOne);
v1Routes.post('/api/v1/:model', handleCreate);
v1Routes.put('/api/v1/:model/:id', handleUpdate);
v1Routes.delete('/api/v1/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.findAll();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.findByPk(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(obj, { where: { id } });
  res.status(201).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  await req.model.destroy({ where: { id } });
  res.status(204).end();
}


module.exports = v1Routes;
