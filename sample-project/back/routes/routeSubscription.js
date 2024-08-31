const express = require('express');
const route = express.Router();
const controllerSubscription = require('../controllers/controllerSubscription');
const middleware = require ('../middleware/cookieJwtAuth');

route.post('/create', middleware.user, controllerSubscription.CreateSubscription);
route.put('/update', middleware.user, controllerSubscription.UpdateSubscription);
route.get('/get/:user_id', middleware.user, controllerSubscription.GetSubscription);
route.delete('/delete/:user_id', middleware.user, controllerSubscription.DeleteSubscription);

module.exports = route