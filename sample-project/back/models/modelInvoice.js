const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const User = require('./modelUser');
const Subscription = require('./modelSubscription');

const Invoice = sequelize.define('Invoices', {
    invoice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invoice_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    invoice_number: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    invoice_amount_excluding_tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    invoice_vat: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    invoice_total_tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    invoice_amount_including_tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
},
    {
        freezeTableName: true
    }    
);

Invoice.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Invoice, { foreignKey: 'user_id' });

Invoice.belongsTo(Subscription, { foreignKey: 'subscription_id' });
Subscription.hasMany(Invoice, { foreignKey: 'subscription_id' });

module.exports = Invoice;