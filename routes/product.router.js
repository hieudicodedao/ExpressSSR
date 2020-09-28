var express = require('express')
var router = express.Router()
var controller = require('../controller/product.controller')

router.get('/',controller.showListProduct)

module.exports = router