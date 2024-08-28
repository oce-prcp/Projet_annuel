const express = require('express')
const route = express.Router()
const controllerDatabase = require('../controllers/controllerDatabase')

route.post('/AllTable', controllerDatabase.AllTables)

module.exports = route