const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Rental = sequelize.define('Rental', {
    rental_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rental_start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    rental_end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
});

Rental.belongsTo(User, { foreignKey: 'user_id' });
Rental.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Rental;
