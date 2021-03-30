const express = require('express')
const router = express.Router()
const controllerUser = require('../../controllers/controllerUser');



router.post('/registration', controllerUser.reg) 
router.post('/login', controllerUser.login)
router.post('/logout', controllerUser.logout)
module.exports = router
