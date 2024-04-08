const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const User = require('./modelUser');

const Society = sequelize.define('Society', {
    society_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    society_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    society_location: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    society_siret: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Society.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Society, { foreignKey: 'user_id' });

module.exports = Society;