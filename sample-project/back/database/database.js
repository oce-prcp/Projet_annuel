const  { Sequelize }  = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DBDATABASE, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: 'mysql',
    port: process.env.DBPORT
});

sequelize.authenticate().then(()=>{
    console.log('authentification réussie')
}).catch((err)=>{
    console.log(err);
})

module.exports = sequelize