const sequelize = require('../database/database');
const User = require('../models/modelUser');
const File = require('../models/modelFile');
const Subscription = require('../models/modelSubscription');
const Invoice = require('../models/modelInvoice');
require('dotenv').config()

exports.AllTables = async (req, res) => {
    try {
        await sequelize.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DBDATABASE);
        await User.sync();
        await File.sync();
        await Subscription.sync();
        await Invoice.sync();
        res.status(200).json('Toutes les tables sont synchronisées avec succès');
    } catch (error) {
        res.status(500).json(error);
    }
};