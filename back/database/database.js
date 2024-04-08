const  { Sequelize }  = require("sequelize")

const sequelize = new Sequelize('projet', 'root','', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

sequelize.authenticate().then(()=>{
    console.log('authentification réussie')
}).catch((err)=>{
    console.log(err);
})

module.exports = sequelize