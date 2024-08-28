const express = require('express');
const route = express.Router();
const controllerInvoice = require('../controllers/controllerInvoice');

route.post('/create', controllerInvoice.CreateInvoice);
route.get('/getAll/:user_id', controllerInvoice.GetInvoice);

module.exports = route;