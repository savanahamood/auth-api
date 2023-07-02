// 'use strict';
// require('dotenv').config();
// const {Sequelize, DataTypes } = require("sequelize");
// const Food=require("./food.model");
// const Clothes=require("./clothes.model");
// //const BooksSchema=require("./book.model");
// //const AuthorsSchema=require("./authors.model");
// const Collection = require('./collections');
// const userModel = require('../auth/models/users.model');



// const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite::memory:" : process.env.DATABASE_URL;
// let sequelizeOptions = process.env.NODE_ENV === "production" ?
//     {
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false,
//             },
//         },
//     } :
//     {}

// let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions)

// /* const AuthorsTable=AuthorsSchema(sequelize, DataTypes)
// const BooksTable=BooksSchema(sequelize, DataTypes)

// const AuthorsCollection = new Collection(AuthorsTable);
// const BooksCollection = new Collection(BooksTable);

// AuthorsTable.hasMany(BooksTable,{
//     foreignKey:'authorId',
//     sourceKey:'id',
// })
// BooksTable.belongsTo(AuthorsTable,{
//     foreignKey:'authorId',
//     targetKey:'id',
// }) */
// module.exports={
//     db:sequelize,
//     Food:Food(sequelize, DataTypes),
//     Clothes:Clothes(sequelize, DataTypes),
//     //BooksModel:BooksCollection,
//     //AuthorsModel:AuthorsCollection

//     users: userModel(sequelize, DataTypes),

// }