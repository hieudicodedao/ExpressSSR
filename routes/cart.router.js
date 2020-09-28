var express = require('express')
var router = express.Router()
var controller = require('../controller/cart.controller')

router.get('/add/:id',controller.add)

module.exports = router