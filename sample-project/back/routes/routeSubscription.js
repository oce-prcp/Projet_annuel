const express = require('express');
const route = express.Router();
const controllerSubscription = require('../controllers/controllerSubscription');
const middleware = require ('../middleware/cookieJwtAuth');

route.post('/create', controllerSubscription.CreateSubscription);
route.put('/update', controllerSubscription.UpdateSubscription);
route.get('/get/:user_id', controllerSubscription.GetSubscription);
route.delete('/delete/:user_id', controllerSubscription.DeleteSubscription);

module.exports = route