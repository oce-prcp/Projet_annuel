const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const User = require("./modelUser");

const Subscription = sequelize.define("Subscription", {
  subscription_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subscription_storage_space: {
    type: DataTypes.DOUBLE(25,2),
    allowNull: false,
  },
  subscription_price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false
  },
  subscription_date: { 
    type: DataTypes.DATE,
    allowNull: false
  },
    },{
        freezeTableName: true,
    }
);

Subscription.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(Subscription, { foreignKey: 'user_id' })

module.exports = Subscription;