const express = require('express')
const route = express.Router()
const controllerUser = require('../controllers/controllerUser')


route.post('/create', controllerUser.CreateUser);
route.post('/login', controllerUser.LoginUser);
route.delete('/delete/:user_id', controllerUser.DeleteUser);
route.get('/get/:user_id', controllerUser.GetUser);
route.get('/getId', controllerUser.GetUserId);

module.exports = route
