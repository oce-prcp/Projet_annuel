const express = require('express')
const route = express.Router()
const controllerUser = require('../controllers/controllerUser')


route.post('/signup', controllerUser.CreateUser);
route.post('/login', controllerUser.LoginUser);
route.get('/delete/:user_id', controllerUser.DeleteUser);
route.get('/get/:user_id', controllerUser.GetUser);
route.get('/getUserId', controllerUser.GetUserId);

module.exports = route
