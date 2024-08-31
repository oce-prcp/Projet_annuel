const express = require('express');
const route = express.Router();
const controllerInvoice = require('../controllers/controllerInvoice');
const middleware = require('../middleware/cookieJwtAuth');

route.post('/create', middleware.user, controllerInvoice.CreateInvoice);
route.get('/getAll/:user_id', controllerInvoice.GetInvoice);

module.exports = route;