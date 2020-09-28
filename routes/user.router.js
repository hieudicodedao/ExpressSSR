const express = require('express')
const app = express();
const router = express.Router()

const multer = require('multer')
const upload = multer({dest : './public/uploads'})

const controller = require('../controller/user.controller')

router.get("/",controller.users)

router.get('/search',controller.search)

router.get('/create-user',controller.createUser)

router.get('/viewdetails-user/:id',controller.viewdetails)

router.post('/create-user',upload.single('avatar'),controller.postCreateUser)

router.get('/signout',controller.signout)

module.exports = router