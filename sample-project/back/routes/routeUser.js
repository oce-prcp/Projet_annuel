const express = require('express')
const route = express.Router()
const controllerUser = require('../controllers/controllerUser')

route.post('/signup', controllerUser.CreateUser);
route.post('/login', controllerUser.LoginUser);
route.delete('/delete/:user_id', controllerUser.DeleteUser);
route.get('/get/:user_id', controllerUser.GetUser);
route.get('/getUserId', controllerUser.GetUserId);
route.get('/getall', controllerUser.getAllUsers);
route.get('/stats/count', controllerUser.getTotalUserCount);
route.get('/storage/total', controllerUser.GetTotalStorageUsed);

module.exports = route
