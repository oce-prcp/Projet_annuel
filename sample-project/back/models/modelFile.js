const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const User = require('./modelUser')


const File = sequelize.define('Files', {
    file_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    file_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    file_size: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    file_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    file_format: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Files',
    timestamps: false
});

File.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(File, { foreignKey: 'user_id' });

module.exports = File;