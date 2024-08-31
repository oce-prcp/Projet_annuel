const express = require('express')
const route = express.Router()
const controllerUser = require('../controllers/controllerUser')
const middleware = require('../middleware/cookieJwtAuth')


route.post('/signup', controllerUser.CreateUser);
route.post('/login', controllerUser.LoginUser);
route.get('/delete/:user_id', middleware.user, controllerUser.DeleteUser);
route.get('/get/:user_id', middleware.user, controllerUser.GetUser);
route.get('/getUserId', middleware.user, controllerUser.GetUserId);
route.get('/getall', middleware.admin, controllerUser.getAllUsers);
route.get('/stats/count', middleware.admin, controllerUser.getTotalUserCount);
route.get('/storage/total', middleware.admin, controllerUser.GetTotalStorageUsed);

module.exports = route
