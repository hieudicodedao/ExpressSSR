let express = require('express')

let router = express.Router()

let controller = require('../controller/transfer.controller')

router.get('/',controller.transfer)
router.post('/',controller.postTransfer)

module.exports  = router