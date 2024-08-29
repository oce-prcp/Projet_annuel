const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const User = sequelize.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_storage_space_used: {
        type: DataTypes.DOUBLE(25,2),
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },{
        freezeTableName: true,
    }
)

module.exports = User