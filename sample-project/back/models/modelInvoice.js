const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const User = require('./modelUser');

const Invoice = sequelize.define('Invoices', {
    invoice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        freezeTableName: true
    }    
);

Invoice.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Invoice, { foreignKey: 'user_id' });

module.exports = Invoice;