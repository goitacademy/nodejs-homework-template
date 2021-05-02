const express = require('express')
const router = express.Router()
const ctrl = require ('../../controllers/users')
const guard = require('../../helper/guard')

//const handleError = require('../../helper/handle-error')

router.post('/register', ctrl.reg)
router.post('/login', ctrl.login)
router.post('/logout', guard, ctrl.logout)

module.exports = router