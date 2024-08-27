const sequelize = require('../database/database');
const User = require('../models/modelUser');
const File = require('../models/modelFile');
const Subscription = require('../models/modelSubscription');
const Invoice = require('../models/modelInvoice');

exports.AllTables = async (req, res) => {
    try {
        await sequelize.query('CREATE DATABASE IF NOT EXISTS `project`');
        await User.sync({ force: true });
        await File.sync({ force: true });
        await Subscription.sync({ force: true });
        await Invoice.sync({ force: true });
        res.status(200).json('Toutes les tables sont synchronisées avec succès');
    } catch (error) {
        res.status(500).json(error);
    }
};