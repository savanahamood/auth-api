'use strict';
require('dotenv').config();
const { TextEncoder } = require('text-encoding');
const userModel = require('./users.model');
const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('../../models/clothes.model.js');
const foodModel = require('../../models/food.model.js');
const Collection = require('../../models/collections.js');
const DATABASE_URL= process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
//const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  food: new Collection(food),
  clothes: new Collection(clothes),
}