'use strict';
const Food = (sequelize, DataTypes) =>
    sequelize.define("food", {
        foodType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        foodCuisine: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


module.exports = Food;